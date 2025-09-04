// 1. Create a Dynamic Tabbed Interface

const switchToTab = (tab) => {
    document.querySelectorAll('.tab').forEach(e => e.classList.remove("active"));
    
    document.querySelectorAll('.content').forEach(e => e.classList.remove("active-content"));

    document.querySelector(`.tab[data-tab="${tab}"]`).classList.add("active");

    document.querySelector(`.content[data-tab="${tab}"]`).classList.add("active-content");
}

document.addEventListener('click', (e) => {
    switchToTab(e.target.getAttribute("data-tab"));
})

document.addEventListener("keydown", (e) => {
    if (e.key === "1") switchToTab(1);
    if (e.key === "2") switchToTab(2);
    if (e.key === "3") switchToTab(3);
});