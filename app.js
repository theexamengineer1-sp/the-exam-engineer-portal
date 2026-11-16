const library = document.getElementById("testLibrary");
const searchInput = document.getElementById("searchInput");
const examFilter = document.getElementById("examFilter");
const languageFilter = document.getElementById("languageFilter");
const resultCount = document.getElementById("resultCount");
const emptyState = document.getElementById("emptyState");

const exams = [...new Set(TESTS.map(test => test.exam))];
exams.forEach(exam => {
  const option = document.createElement("option");
  option.value = exam;
  option.textContent = exam;
  examFilter.appendChild(option);
});

function safeUrl(url) {
  if (!url || url === "https://github.com/" || url.trim() === "") return "";
  try {
    const parsed = new URL(url);
    return ["https:", "http:"].includes(parsed.protocol) ? parsed.href : "";
  } catch { return ""; }
}

function render() {
  const query = searchInput.value.trim().toLowerCase();
  const exam = examFilter.value;
  const language = languageFilter.value;

  const filtered = TESTS.filter(test => {
    const searchable = [test.exam, test.subject, test.title, test.description].join(" ").toLowerCase();
    const matchesQuery = !query || searchable.includes(query);
    const matchesExam = exam === "all" || test.exam === exam;
    const matchesLanguage = language === "all" || test.language === language || test.language === "Both";
    return matchesQuery && matchesExam && matchesLanguage;
  });

  resultCount.textContent = `${filtered.length} ${filtered.length === 1 ? "test" : "tests"}`;
  library.innerHTML = "";
  emptyState.classList.toggle("hidden", filtered.length !== 0);

  let lastExam = "";
  filtered.forEach(test => {
    if (test.exam !== lastExam) {
      const heading = document.createElement("div");
      heading.className = "exam-section";
      heading.textContent = test.exam;
      library.appendChild(heading);
      lastExam = test.exam;
    }

    const card = document.createElement("article");
    card.className = "test-card";

    const top = document.createElement("div");
    top.className = "card-top";
    const tag = document.createElement("span");
    tag.className = "tag";
    tag.textContent = test.subject;
    const lang = document.createElement("span");
    lang.className = "lang";
    lang.textContent = test.language === "Both" ? "English + Hindi" : test.language;
    top.append(tag, lang);

    const title = document.createElement("h3");
    title.textContent = test.title;
    const desc = document.createElement("p");
    desc.textContent = test.description || "";

    const bottom = document.createElement("div");
    bottom.className = "card-bottom";
    const subject = document.createElement("span");
    subject.className = "subject";
    subject.textContent = test.exam;

    const actions = document.createElement("div");
    actions.style.display = "flex";
    actions.style.gap = "7px";
    const en = safeUrl(test.englishUrl);
    const hi = safeUrl(test.hindiUrl);
    if (en) actions.append(makeLink(en, "English"));
    if (hi) actions.append(makeLink(hi, "हिंदी"));
    if (!en && !hi) {
      const pending = document.createElement("span");
      pending.className = "subject";
      pending.textContent = "Link coming soon";
      actions.append(pending);
    }
    bottom.append(subject, actions);
    card.append(top, title, desc, bottom);
    library.appendChild(card);
  });
}

function makeLink(url, label) {
  const link = document.createElement("a");
  link.className = "test-link";
  link.href = url;
  link.target = "_blank";
  link.rel = "noopener noreferrer";
  link.textContent = `${label} ↗`;
  return link;
}

[searchInput, examFilter, languageFilter].forEach(el => el.addEventListener("input", render));
document.getElementById("resetFilters").addEventListener("click", () => {
  searchInput.value = "";
  examFilter.value = "all";
  languageFilter.value = "all";
  render();
});
document.addEventListener("keydown", event => {
  if (event.key === "/" && !["INPUT", "TEXTAREA", "SELECT"].includes(document.activeElement.tagName)) {
    event.preventDefault();
    searchInput.focus();
  }
});
render();
