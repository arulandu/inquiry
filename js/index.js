VANTA.CLOUDS({
  el: "#background",
  mouseControls: false,
  touchControls: false,
  gyroControls: false,
  minHeight: 200.00,
  minWidth: 200.00,
})

const main = async () => {
  const d = await (await fetch('/md/dir.json')).json()
  for(let category of d.categories) {
    for(let i = 0; i < category.files.length; i++){
      category.files[i].data = DOMPurify.sanitize(marked.parse(category.files[i].data))
    }
  }

  const viewer = document.getElementsByClassName("viewer")[0]
  const nav = document.getElementsByClassName("nav")[0]

  for(let category of d.categories){
    const div = document.createElement("div"); div.classList.add("category"); 

    const title = document.createElement("h1"); title.classList.add("category-title");
    const titleName = category.name[0].toUpperCase() + category.name.substring(1);
    title.innerHTML = titleName;
    div.appendChild(title)

    div.id = titleName;
    const navLink = document.createElement("a"); navLink.id = titleName; navLink.href = "#" + titleName; navLink.innerHTML = titleName;
    nav.appendChild(navLink)

    const entries = document.createElement("div"); entries.classList.add("entries");
    div.appendChild(entries)

    for(let file of category.files){
      const entry = document.createElement("div"); entry.classList.add("entry");
      const content = document.createElement("div"); content.innerHTML = DOMPurify.sanitize(marked.parse(file.data));
      const date = document.createElement("p"); date.classList.add("date"); date.innerHTML = file.date;
      
      entry.appendChild(date)
      entry.appendChild(content)

      entries.appendChild(entry)
    }
    
    viewer.appendChild(div)
  }
}

main()

// document.getElementById('content').innerHTML = DOMPurify.sanitize(marked.parse(`# Marked in the browser\n\nRendered by **marked**.`));
