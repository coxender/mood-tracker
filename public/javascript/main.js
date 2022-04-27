const logStub = [
  {
    date: "2019-01-01",
    emotions: ["happy", "sad", "depressed"],
    memo: "Todays memo is...",
  },
  {
    date: "2018-12-31",
    emotions: ["happy", "sad", "depressed"],
    memo: "Todays memo is...",
  },
  {
    date: "2018-12-30",
    emotions: ["happy", "sad", "depressed"],
    memo: "Todays memo is...",
  },
  {
    date: "2018-12-29",
    emotions: ["happy", "sad", "depressed"],
    memo: "Todays memo is...",
  },
];

const newEntryForm = document.querySelector("#new-entry");
newEntryForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const entryData = new FormData(newEntryForm);

  const newEntry = {
    date: Date.now(),
    emotions: entryData.getAll("mood-tags"),
    memo: entryData.get("memo"),
  };

  logStub.unshift(newEntry);

  loadEntries(logStub);
  newEntryForm.reset();
});

const entryTemplate = document.querySelector("#entry-template");
const entryWrapper = document.querySelector("#entry-wrapper");

/**
 * loads data entries from an array of objects into DOM
 * @param {{date:number, emotions: string[], memo: string}[]} entries
 */
function loadEntries(entries) {
  entryWrapper.textContent = "";

  for (let entry of entries) {
    const fragment = entryTemplate.content.cloneNode(true);

    const emotionsWrapper = fragment.querySelector(".emotion-wrapper");
    for (let emotion of entry.emotions) {
      const chip = document.createElement("div");
      chip.textContent = emotion;
      chip.classList.add("emotion-chip");
      emotionsWrapper.appendChild(chip);
    }

    const dateElement = fragment.querySelector(".date");
    const date = new Date(entry.date);
    dateElement.textContent = date.toLocaleDateString(undefined, { weekday: "long", month: "long", day: "numeric" });

    const memo = fragment.querySelector(".memo");
    memo.textContent = entry.memo;

    entryWrapper.appendChild(fragment);
  }
}

loadEntries(logStub);
