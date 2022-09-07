document.querySelector('.mirai').addEventListener("click", showTabs);

const tabs = document.querySelector('.tab-container')
const eachTab = document.querySelectorAll('.tab')

function showTabs(e) {
    e.target.removeEventListener(e.type, showTabs);
    tabs.classList.toggle('tabs-show')
    Toastify({

        text: "W-Welcome, i'm Mirai , feel free to visit our different pages down here",
        style: {
            background: "linear-gradient(45deg, #292929, #1a2f3f)",
          },
        duration: 3000
        
        }).showToast();

}

