/**
 * 自定义事件
 *
 */
//定义私有方法
const addEventListener = Symbol('addEventListener');
const removeEventListener = Symbol('removeEventListener');
class CustomEvent {
  events={};
  funProperty={};
  constructor({ obj, eventNames = [] }) {
    if (!obj) {
      throw new Error('events bind object cannot be empty!');
    }
    eventNames.forEach((eventName) => {
      this.events[eventName] = [];
      this.funProperty[eventName] = [];
    });
    obj.selfAddEventListener = (eventName, fun, async = false) => { this[addEventListener](eventName, fun, async); };
    obj.selfRemoveEventListener = (eventName, fun) => { this[removeEventListener](eventName, fun); };
  }
  async execute(eventName, ev = {}) {
    if (this.events[eventName]) {
      const e = {
        'stopPropagation': false,
        'data': ev
      };
      this.events[eventName].some(async (fun, ind) => {
        const funPro = this.funProperty[eventName][ind];
        if (funPro.async) {
          await fun(e);
        } else {
          fun(e);
        }
        return e.stopPropagation;
      });
    }
  }
  /**
   * 注册事件
   * eventName string 事件名
   * fun 要执行的方法
   * async 是否异步函数并等待执行完再执行下一个
   *  注当async == true 时 fun必须返回Promise 对象否则会造成程序假死
   */
  [addEventListener](eventName, fun, async) {
    if (this.events[eventName]) {
      this.events[eventName].unshift(fun);
      /*eslint quote-props: ["error", "always"]*/
      this.funProperty[eventName].unshift({ 'async': async });
    }
  }
  [removeEventListener](constomEvent, eventName, fun) {
    if (this.events[eventName]) {
      const ind = this.events[eventName].indexOf(fun);
      if (ind > -1) {
        this.events[eventName].splice(ind, 1);
        this.funProperty[eventName].splice(ind, 1);
      }
    }
  }
}


export default CustomEvent;
