Page({
  data:{
    logs: []
  },
  onShow: function () {
    var logs = wx.getStorageSync('todo_logs')
    if (logs) {
      this.setData({ logs: logs.reverse() })
    }
  },
})
