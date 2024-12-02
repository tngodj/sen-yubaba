//상단 메뉴
// 드롭다운 메뉴 표시/숨김
function toggleDropdown() {
    const dropdown = document.getElementById('dropdown-menu');
    if (dropdown.style.display === "none" || dropdown.style.display === "") {
        dropdown.style.display = "flex"; // 메뉴 보이기
    } else {
        dropdown.style.display = "none"; // 메뉴 숨기기
    }
}

// 서브 버튼 클릭 처리
function clickSubButton(buttonId) {
    switch (buttonId) {
        case 0:
            window.location.href = "https://tngodj.github.io/Gibli_Fan_Page/"; // 버튼 0 클릭 시 이동할 URL
            break;
        case 1:
            window.location.href = "https://hyunjin0101.github.io/totoro-poster/"; // 버튼 1 클릭 시 이동할 URL
            break;
        case 2:
            window.location.href = "https://tngodj.github.io/Gibli-WorldCup-Main/"; // 버튼 2 클릭 시 이동할 URL
            break;
        case 3:
            window.location.href = "https://tngodj.github.io/OST_Game"; // 버튼 3 클릭 시 이동할 URL
            break;
        case 4:
            window.location.href = "https://tngodj.github.io/Character-Name-Game/"; // 버튼 4 클릭 시 이동할 URL
            break;
        default:
            console.error("잘못된 버튼 ID입니다."); // 디버그용
    }
};

function showMoreContent() {
    const content = document.getElementById("additional-content");
    const moreInfoButton = document.querySelector(".more-info");

    content.style.display = "block"; // 숨겨진 콘텐츠 보이기
    moreInfoButton.style.display = "none"; // "더 알기" 버튼 숨기기
}

function hideMoreContent() {
    const content = document.getElementById("additional-content");
    const moreInfoButton = document.querySelector(".more-info");

    content.style.display = "none"; // 숨겨진 콘텐츠 숨기기
    moreInfoButton.style.display = "block"; // "더 알기" 버튼 다시 표시
}

document.addEventListener("DOMContentLoaded", () => {
    const items = document.querySelectorAll(".coverflow-item");
    let activeIndex = Math.floor(items.length / 2); // 기본 활성화 인덱스
    let autoSlideInterval;

    const updateCoverflow = () => {
        items.forEach((item, index) => {
            item.classList.remove("active", "prev", "next", "hidden");

            if (index === activeIndex) {
                item.classList.add("active");
                item.style.pointerEvents = "auto"; // 활성화된 포스터 클릭 가능
            } else if (index === activeIndex - 1) {
                item.classList.add("prev");
                item.style.pointerEvents = "none"; // 비활성화된 포스터 클릭 불가
            } else if (index === activeIndex + 1) {
                item.classList.add("next");
                item.style.pointerEvents = "none"; // 비활성화된 포스터 클릭 불가
            } else {
                item.classList.add("hidden");
                item.style.pointerEvents = "none"; // 화면 밖 포스터 클릭 불가
            }
        });
    };

    // 초기 설정
    updateCoverflow();

    // 화살표 키로 이동
    document.addEventListener("keydown", (e) => {
        if (e.key === "ArrowLeft") {
            moveTo(activeIndex - 1);
        } else if (e.key === "ArrowRight") {
            moveTo(activeIndex + 1);
        }
    });

    // 활성화된 포스터 클릭 이벤트
    items.forEach((item) => {
        item.addEventListener("click", () => {
            if (item.classList.contains("active")) {
                const link = item.getAttribute("data-link");
                if (link) {
                    window.open(link, "_blank"); // 새 창으로 링크 열기
                }
            }
        });
    });

    // 슬라이드 이동 함수
    const moveTo = (index) => {
        activeIndex = Math.max(0, Math.min(index, items.length - 1)); // 인덱스 범위 제한
        updateCoverflow();
    };

    // 자동 슬라이드 기능
    const startAutoSlide = () => {
        autoSlideInterval = setInterval(() => {
            moveTo((activeIndex + 1) % items.length); // 다음 아이템으로 이동
        }, 5000); // 3초마다 자동 전환
    };

    const stopAutoSlide = () => {
        clearInterval(autoSlideInterval);
    };

    // 터치 이벤트 (모바일)
    let startX = 0;
    let endX = 0;

    const handleTouchStart = (e) => {
        startX = e.touches[0].clientX;
        stopAutoSlide(); // 터치 중에는 자동 슬라이드 정지
    };

    const handleTouchEnd = (e) => {
        endX = e.changedTouches[0].clientX;
        const distance = endX - startX;

        if (distance > 50) {
            moveTo(activeIndex - 1); // 왼쪽으로 슬라이드
        } else if (distance < -50) {
            moveTo(activeIndex + 1); // 오른쪽으로 슬라이드
        }

        startAutoSlide(); // 터치 종료 후 자동 슬라이드 재시작
    };

    items.forEach((item) => {
        item.addEventListener("touchstart", handleTouchStart);
        item.addEventListener("touchend", handleTouchEnd);
    });

    // 자동 슬라이드 시작
    startAutoSlide();
});
