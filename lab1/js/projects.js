const data = [
  {
    img: "./img/jpg/projects/1.jpg",
    title: "Project Title goes here",
    desc: "This is sample project description random things are here in description This is dsample project lorem ipsum generator for dummy content",
    technology: [
      {
        title: "HTML",
        id: "html",
      },
      {
        title: "JavaScript",
        id: "java-script",
      },
      {
        title: "SASS",
        id: "sass",
      },
      {
        title: "React",
        id: "react",
      },
    ],
    theme: [
      {
        title: "Landing",
        id: "landing",
      },
    ],
    platform: [
      {
        title: "Web",
        id: "web",
      },
    ],
  },
  {
    img: "./img/jpg/projects/1.jpg",
    title: "Project Title goes here",
    desc: "This is sample project description random things are here in description This is dsample project lorem ipsum generator for dummy content",
    technology: [
      {
        title: "HTML",
        id: "html",
      },
      {
        title: "React",
        id: "react",
      },
    ],
    theme: [
      {
        title: "Ecommerce",
        id: "ecommerce",
      },
    ],
    platform: [
      {
        title: "IOS",
        id: "ios",
      },
    ],
  },
  {
    img: "./img/jpg/projects/1.jpg",
    title: "Project Title goes here",
    desc: "This is sample project description random things are here in description This is dsample project lorem ipsum generator for dummy content",
    technology: [
      {
        title: "HTML",
        id: "html",
      },
      {
        title: "JavaScript",
        id: "java-script",
      },
      {
        title: "SASS",
        id: "sass",
      },
      {
        title: "React",
        id: "react",
      },
    ],
    theme: [
      {
        title: "Blog",
        id: "blog",
      },
    ],
    platform: [
      {
        title: "Android",
        id: "android",
      },
    ],
  },
  {
    img: "./img/jpg/projects/1.jpg",
    title: "Project Title goes here",
    desc: `This is sample project description random things are here in description
				 This is dsample project lorem ipsum generator for dummy content`,
    technology: [
      {
        title: "HTML",
        id: "html",
      },
    ],
    theme: [
      {
        title: "Landing",
        id: "landing",
      },
    ],
    platform: [
      {
        title: "Web",
        id: "web",
      },
    ],
  },
];

const projectsContainer = document.querySelector(".js-projects-container");
const filtersForm = document.querySelector(".js-filters");
const activeFilters = {};

// var isHorizontal = false;

const createProjectTemplate = (project) => {
  return `<article class="project-card">
					<img class="img" src="${project.img}" alt="">
					<div class="content">
						<h3 class="name">${project.title}</h3>
						<p class="desc">${project.desc}</p>
						<p class="stack"><b>Tech stack</b>: ${project.technology
              .map((item) => item.title)
              .join(", ")}</p>
						<p class="stack"><b>Platform</b>: ${project.platform
              .map((item) => item.title)
              .join(", ")}</p>
						<p class="stack"><b>Theme</b>: ${project.theme
              .map((item) => item.title)
              .join(", ")}</p>
						<div class="actions">
						<a href="" class="link">
                  <img class="icon" src="./img/svg/link.svg" alt="" />
                  Live Preview
                </a>
							<a href="" class="link">
                  <img class="icon" src="./img/svg/github.svg" alt="" />
                  View Code
                </a>
						</div>
					</div>
				</article>`;
};

const dataRender = (data, container) => {
  if (!(typeof data === "object")) {
    return "";
  }
  if (data.length === 0) {
    container.innerHTML = `<p class="no-item">There are no items that satisfy the filter</p>`;
    return;
  }

  let content = "";

  for (let i = 0; i < data.length; i++) {
    content += createProjectTemplate(data[i]);
  }

  container.innerHTML = content;
};

const itemIsValid = (dataItem, activeFilters) => {
  let count = 0;
  for (const activeFilterKey in activeFilters) {
    const activeFilterValue = activeFilters[activeFilterKey];
    const itemHasFilterValue = dataItem[activeFilterKey]
      .map((item) => item.id)
      .includes(activeFilterValue);
    if (itemHasFilterValue) {
      count++;
    }
  }
  return Object.keys(activeFilters).length === count;
};

const handleFormChange = (event) => {
  const target = event.target;
  const targetValue = target.value;
  const targetName = target.name;

  if (targetValue === "") {
    delete activeFilters[targetName];
    if (!Object.keys(activeFilters).length) {
      dataRender(data, projectsContainer);
      return;
    }
  } else {
    activeFilters[targetName] = targetValue;
  }

  const filteredData = data.filter((dataItem) =>
    itemIsValid(dataItem, activeFilters)
  );
  dataRender(filteredData, projectsContainer);
};

filtersForm.addEventListener("change", handleFormChange);
dataRender(data, projectsContainer);

// const handleContentLoaded = dataRender(data, projectsContainer);
// document.addEventListener('DOMContentLoaded', handleContentLoaded);

const changeViewBtn = document.querySelector(".btn-change-view");

const changeCardsView = (event) => {
  event.preventDefault();
  projectsContainer.classList.toggle("horizontal");
};

changeViewBtn.addEventListener("click", changeCardsView);
