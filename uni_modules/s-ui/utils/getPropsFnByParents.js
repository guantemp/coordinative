/**
 * @name: 为了兼容微信小程序props 传function this指向问题，用此方法获取后在调用
 * @param {Vue} vm Vue组件实例this
 * @param {Function} propFn 子级props方法
 * @return {Function} 返回一个this指向使用该组件父级vm的方法
 * @example: getPropsFnByParents(this,this.beforeShow)(...args)
 */
export default function getPropsFnByParents (vm, propFn) {
  if (typeof propFn === 'function') {
    let parent = vm.$parent;
    while (parent) {
      const methodsKeys = Object.keys(parent.$options.methods || {});
      // h5中props中的方法是 使用的父级vm上的方法，绑定了this，不会存在this指向子级的问题
      const parentMethodsList = methodsKeys.map(key => parent[key]);
      // 微信小程序中props中的方法是 使用的父级vm.$options.methods上的方法，所以没有绑定this
      const parentOptionsMethodsList = methodsKeys.map(key => parent.$options.methods[key]);

      if (parentMethodsList.includes(propFn) || parentOptionsMethodsList.includes(propFn)) {
        // 返回指向 使用该组件父级vm的方法
        return propFn.bind(parent);
      } else {
        parent = parent.$parent;
      }
    }
  }
  return propFn;
}
