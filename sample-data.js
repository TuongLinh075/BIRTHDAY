// Dữ liệu mẫu (Sample Demo Data) để người dùng có thể thử nghiệm ngay lập tức
window.SAMPLE_BIRTHDAY_DATA = {
  recipientName: "Bé Trúc Yêu Dấu 🌸",
  birthdate: "2026-09-16",
  senderName: "Người bạn đặc biệt ✨",
  theme: "theme-pastel",
  music: "musicbox",
  wishMessage: "Chúc mừng sinh nhật cô gái tuyệt vời nhất! 🎂✨\n\nTuổi mới chúc bạn luôn tràn ngập nụ cười rạng rỡ, xinh đẹp, bình an và đạt được tất cả những ước mơ mà bạn hằng ấp ủ.\n\nCảm ơn bạn vì đã luôn là một mảnh ghép dịu dàng và mang lại biết bao niềm vui. Hãy luôn tự tin tỏa sáng như chính con người bạn nhé! Happy Birthday to you! 💖🎉",
  photos: [
    {
      caption: "Nụ cười tỏa nắng ở quán quen ☕",
      dataUrl: createCuteSvgPhoto("🌸", "Khoảnh khắc bình yên", "#ffe3ec", "#ff7597")
    },
    {
      caption: "Chuyến đi đáng nhớ cùng nhau 🚗🏖️",
      dataUrl: createCuteSvgPhoto("✨", "Chuyến đi ngập tràn niềm vui", "#e0f2fe", "#38bdf8")
    },
    {
      caption: "Luôn xinh xắn và yêu đời như thế nhé! 🎂",
      dataUrl: createCuteSvgPhoto("🎉", "Tuổi mới rạng rỡ", "#fef3c7", "#f59e0b")
    }
  ]
};

// Hàm tạo ảnh kỷ niệm mẫu dạng SVG chuẩn đẹp không phụ thuộc internet
function createCuteSvgPhoto(icon, text, bgColor, accentColor) {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="450" height="450" viewBox="0 0 450 450">
    <defs>
      <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style="stop-color:${bgColor};stop-opacity:1" />
        <stop offset="100%" style="stop-color:${accentColor};stop-opacity:0.35" />
      </linearGradient>
      <pattern id="pattern-circles" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
        <circle cx="20" cy="20" r="2" fill="${accentColor}" opacity="0.25"/>
      </pattern>
    </defs>
    <rect width="450" height="450" fill="url(#grad)" rx="16"/>
    <rect width="450" height="450" fill="url(#pattern-circles)" rx="16"/>
    <circle cx="225" cy="180" r="75" fill="#ffffff" opacity="0.85" filter="drop-shadow(0 8px 16px rgba(0,0,0,0.06))"/>
    <text x="225" y="198" font-size="64" text-anchor="middle" font-family="sans-serif">${icon}</text>
    <text x="225" y="300" font-size="20" font-weight="bold" fill="#334155" text-anchor="middle" font-family="'Plus Jakarta Sans', Arial, sans-serif">${text}</text>
    <text x="225" y="332" font-size="14" fill="#64748b" text-anchor="middle" font-family="'Plus Jakarta Sans', Arial, sans-serif">Memory with You • Special Moments</text>
  </svg>`;
  return 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svg);
}

// Các mẫu lời chúc sinh nhật được soạn sẵn
window.QUICK_WISHES = {
  sweet: "Chúc mừng sinh nhật người thương dịu dàng nhất của mình! 💖\n\nCảm ơn vì cậu đã đến và mang theo cả một bầu trời ấm áp. Tuổi mới, chúc cậu luôn an yên, hạnh phúc, xinh đẹp và được yêu thương thật nhiều. Dù ngày mai có thế nào, mình vẫn luôn ở đây bên cạnh cậu! Chúc mừng sinh nhật em! 🎂✨",
  funny: "Happy Birthday! 🎉 Chúc bạn tôi tuổi mới:\n- Tiền vào như nước sông Đà, tiền ra nhỏ giọt như cà phê phin.\n- Nhan sắc thăng hạng, bớt ngơ ngơ và sớm khao tôi một bữa ăn thật to nhé!\nChúc bạn luôn vui vẻ, may mắn và sớm rước người yêu về ra mắt anh em! 🍻🤣",
  friend: "Chúc mừng sinh nhật bạn thân chí cốt của tao! 🍻🎉\n\nCảm ơn vì bao năm qua vẫn chịu đựng được cái tính dở hơi của nhau. Tuổi mới chúc mày sự nghiệp rực rỡ, tiền đầy túi, tình đầy tim, bớt thức khuya và luôn giữ trọn ngọn lửa đam mê nhé. Mãi là bạn tốt của nhau! 🥂✨",
  deep: "Chúc mừng sinh nhật! 🌟\n\nThêm một tuổi mới là thêm một bước trưởng thành, nhiều trải nghiệm và cơ hội mới. Chúc bạn luôn kiên định với con đường mình đã chọn, có đủ dũng khí để vượt qua thử thách và gặt hái thật nhiều thành công rực rỡ. Chúc tuổi mới thật viên mãn và hạnh phúc! 🍀🎂"
};
