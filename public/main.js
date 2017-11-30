var update = document.getElementById('update')
var del = document.getElementById('delete')

update.addEventListener('click', function () {
    fetch('quotes', {
        method: 'put',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          'name': 'Darth Vader',
          'quote': 'I can feel its immense power, come to my side and together we will dominate the galaxy.'
        })
      })
      .then(res => {
        if (res.ok) return res.json()
      })
      .then(data => {
        console.log(data)
        window.location.reload(true)
      })
})

del.addEventListener('click', function () {
    fetch('quotes', {
      method: 'delete',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        'name': 'Darth Vader'
      })
    })
    .then(res => {
        if (res.ok) return res.json()
      })
      .then(data => {
        console.log(data)
        window.location.reload(true)
        })
})