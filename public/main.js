function textAreaSize() {
    var textArea = document.querySelector(".post");
    textArea.style.height = "auto"; // Reset the height to auto to recalculate the size

    // Calculate the maximum height for 5 lines
    var maxHeight = parseInt(window.getComputedStyle(textArea).lineHeight) * 5;

    // Set the height to the scrollHeight, but not exceeding the maximum height
    textArea.style.height = Math.min(textArea.scrollHeight, maxHeight) + "px";
}