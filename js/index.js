VANTA.CLOUDS({
  el: "#background",
  mouseControls: false,
  touchControls: false,
  gyroControls: false,
  minHeight: 200.00,
  minWidth: 200.00,
})

let data = null
const main = async () => {
  const d = await (await fetch('/md/dir.json')).json()
  for (let i = 0; i < d.files.length; i++) {
    d.files[i].data = DOMPurify.sanitize(marked.parse(d.files[i].data))
  }

  data = d;

  const nav = document.getElementsByClassName("nav")[0]

  let categories = new Set()
  categories.add("All")
  for (let file of data.files) {
    categories.add(file.category)
  }

  for (let category of categories) {
    const titleName = category[0].toUpperCase() + category.substring(1);

    const navLink = document.createElement("button"); navLink.classList.add(titleName); navLink.id = titleName; navLink.innerHTML = titleName;
    navLink.onclick = () => {
      populate(category=titleName)
    }
    // navLink.addEventListener("click", )
    nav.appendChild(navLink)
  }

  await populate(category="All")
}

const populate = async (category="All") => {
  const viewer = document.getElementsByClassName("viewer")[0]
  viewer.innerHTML = ""
  
  const entries = document.createElement("div"); entries.classList.add("entries");

  for (let file of data.files) {
    const titleName = file.category[0].toUpperCase() + file.category.substring(1);
    if(category != "All" && category != titleName) continue;

    const entry = document.createElement("div"); entry.classList.add("entry");
    const content = document.createElement("div"); content.classList.add("content"); content.innerHTML = DOMPurify.sanitize(marked.parse(file.data));
    const meta = document.createElement("div"); meta.classList.add("meta");
    const cat = document.createElement("p"); cat.classList.add("category"); cat.classList.add(titleName); cat.innerHTML = titleName;
    const date = document.createElement("p"); date.classList.add("date"); date.innerHTML = file.date;
    meta.appendChild(date); meta.appendChild(cat);

    entry.appendChild(meta)
    entry.appendChild(content)
    entries.appendChild(entry)
  }

  viewer.appendChild(entries)
}

main()
