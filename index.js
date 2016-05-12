var h = require('hyperscript')

module.exports = function () {

  var names = []
  var tabs = h('div', {style: {display: 'flex', direction: 'row'}})
  var content = h('div')

  var d = h('div.tabs',
    {style: {display: 'flexbox', flex: 'column'}},
    tabs, content
  )

  d.add = function (name, tab, change) {
    names.push(name)
    tabs.appendChild(h('div', h('a', name, {href: '#', onclick: function (ev) {
      ev.preventDefault()
      ev.stopPropagation()
      d.select(name)
    }})))
    tab.style.display = 'none'
    content.appendChild(tab)
    if(change !== false) d.select(name)
  }

  d.select = function (name) {
    selected = name
    var i = names.indexOf(name)
    if(!~i) return console.log('unknown tab:'+name + ' expected:' + JSON.stringify(names) + i)
    ;[].forEach.call(tabs.children, function (el) {
      el.classList.remove('selected')
    })
    tabs.children[i].classList.add('selected')
    ;[].forEach.call(content.children, function (tab) {
      tab.style.display = 'none'
    })
    content.children[i].style.display = 'block'
  }

  d.remove = function (name) {
    var i = names.indexOf(name)
    if(!~i) return
    names.splice(i, 1)
    tabs.removeChild(tabs.children[i])
    content.removeChild(content.children[i])
    if(selected === name)
      d.select(names[i] || names[0])
  }

  return d
}


