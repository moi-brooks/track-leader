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
          list.appendChild(li);
        });
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