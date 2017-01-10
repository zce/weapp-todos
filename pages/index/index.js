// 1. 完成页面结构、布局、样式
// 2. 设计数据结构
// 3. 完成数据绑定
// 4. 设计交互操作事件
// 5. 数据存储
Page({
  // ===== 页面数据对象 =====
  data: {
    input: '',
    todos: [],
    leftCount: 0,
    allCompleted: false
  },
  save: function () {
    wx.setStorageSync('todos_list', this.data.todos)
  },
  load: function () {
    var todos = wx.getStorageSync('todos_list')
    if (todos) {
      var leftCount = todos.filter(function (item) {
        return !item.completed
      }).length
      this.setData({ todos: todos, leftCount: leftCount })
    }
  },
  // ===== 页面生命周期方法 =====
  onLoad: function () {
    this.load()
  },
  // ===== 事件处理函数 =====
  inputChangeHandle: function (e) {
    this.setData({ input: e.detail.value })
  },
  addTodoHandle: function (e) {
    if (!this.data.input || !this.data.input.trim()) return
    var todos = this.data.todos
    todos.push({ name: this.data.input, completed: false })
    this.setData({
      input: '',
      todos: todos,
      leftCount: this.data.leftCount + 1
    })
    this.save()
  },
  toggleTodoHandle: function (e) {
    var index = e.currentTarget.dataset.index
    var todos = this.data.todos
    todos[index].completed = !todos[index].completed
    this.setData({
      todos: todos,
      leftCount: this.data.leftCount + (todos[index].completed ? -1 : 1)
    })
    this.save()
  },
  removeTodoHandle: function (e) {
    var index = e.currentTarget.dataset.index
    var todos = this.data.todos
    var remove = todos.splice(index, 1)[0]
    this.setData({
      todos: todos,
      leftCount: this.data.leftCount - (remove.completed ? 0 : 1)
    })
    this.save()
  },
  toggleAllHandle: function (e) {
    this.data.allCompleted = !this.data.allCompleted
    var todos = this.data.todos
    for (var i = todos.length - 1; i >= 0; i--) {
      todos[i].completed = this.data.allCompleted
    }
    this.setData({
      todos: todos,
      leftCount: this.data.allCompleted ? 0 : todos.length
    })
    this.save()
  },
  clearCompletedHandle: function (e) {
    var todos = this.data.todos
    var remains = []
    for (var i = 0; i < todos.length; i++) {
      todos[i].completed || remains.push(todos[i])
    }
    this.setData({ todos: remains })
    this.save()
  }
})
