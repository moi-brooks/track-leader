document.addEventListener("DOMContentLoaded", () => {
  const input = document.getElementById("leadInput");
  const button = document.getElementById("saveLead");
  const list = document.getElementById("leadList");

  function loadLeads() {
    chrome.storage.local.get(["leads"], (data) => {
      list.innerHTML = "";
      const leads = data.leads || [];
      leads.forEach((lead, index) => {
        const li = document.createElement("li");
        li.textContent = lead;

        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "X";
        deleteBtn.classList.add("delete-btn");
        deleteBtn.addEventListener("click", () => deleteLead(index));

        li.appendChild(deleteBtn);
        list.appendChild(li);
      });
    });
  }

  function deleteLead(index) {
    chrome.storage.local.get(["leads"], (data) => {
      let leads = data.leads || [];
      leads.splice(index, 1);
      chrome.storage.local.set({ leads }, loadLeads);
    });
  }

  button.addEventListener("click", () => {
    const newLead = input.value.trim();
    if (newLead) {
      chrome.storage.local.get(["leads"], (data) => {
        const leads = data.leads || [];
        leads.push(newLead);
        chrome.storage.local.set({ leads }, loadLeads);
      });
      input.value = "";
    }
  });

  loadLeads();
});
