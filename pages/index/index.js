// 1. 完成页面结构、布局、样式
// 2. 设计数据结构
// 3. 完成数据绑定
// 4. 设计交互操作事件
// 5. 数据存储
Page({
  data: {
    input: '',
    todos: [
      { name: 'Learning HTML5', completed: true },
      { name: 'Learning CSS3', completed: false },
      { name: 'Learning ECMAScript 2016', completed: false },
      { name: 'Learning React', completed: false }
    ],
    leftCount: 3
  },
  inputChangeHandle: function (e) {
    this.setData({ input: e.detail.value })
  },
  addTodoHandle: function (e) {
    var todos = this.data.todos
    todos.push({ name: this.data.input, completed: false })
    this.setData({ todos: todos })
  }
})
