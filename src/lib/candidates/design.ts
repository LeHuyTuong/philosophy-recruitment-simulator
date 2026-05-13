import type { Candidate } from './types';

export const candidates: Candidate[] = [
  // ── Q1: High GPA + High practice → 4 success ──
  {
    id: "des_c01",
    name: "Trần Minh Tâm",
    gpa: 3.82,
    internshipMonths: 9,
    projects: 3,
    skills: ["Figma", "UI/UX", "Adobe Suite"],
    note: "Portfolio 20 dự án, 10 dự án có client trả tiền",
    quadrant: "Q1",
    outcome: "success",
    trialResult: {
      verdict: "Design xuất sắc",
      bullets: [
        "Thiết kế giao diện app e-commerce đạt 95 điểm usability test",
        "Build design system với 100+ reusable components trong Figma",
        "Client feedback: 'giao diện đẹp hơn mong đợi, đúng brand'"
      ]
    },
    interviewAnswer: {
      question: 1,
      style: "concrete",
      text: "Làm project app food delivery, developer và em bất đồng về navigation pattern. Em đề xuất A/B test cả 2 pattern với 5 user mỗi bên, record session bằng Hotjar. Tab bar win ở task completion time, bottom sheet win ở discoverability. Em propose hybrid: tab bar chính + bottom sheet cho filter. Dev đồng ý vì em có data backup."
    }
  },
  {
    id: "des_c02",
    name: "Ngô Thị Hà",
    gpa: 3.75,
    internshipMonths: 7,
    projects: 4,
    skills: ["Branding", "Illustration", "Typography"],
    note: "Freelance branding cho 5 startup",
    quadrant: "Q1",
    outcome: "success",
    trialResult: {
      verdict: "Creative + Systematic",
      bullets: [
        "Thiết kế brand identity hoàn chỉnh cho client F&B trong 2 tuần",
        "Build brand guideline 60 trang chi tiết đến từng pixel",
        "Logo design lọt top 10 cuộc thi branding quốc gia"
      ]
    },
    interviewAnswer: {
      question: 2,
      style: "concrete",
      text: "Client yêu cầu rebrand trong 1 tuần cho event launch. Em quyết định preserve core elements (color palette, mascot) mà chỉ refresh typography và layout. Em làm 3 moodboard trong 1 ngày, client chọn hướng. Em加班 3 đêm deliver full package: logo variation, social template, event backdrop. Event thành công, client extend hợp đồng 6 tháng."
    }
  },
  {
    id: "des_c03",
    name: "Lê Quang Vinh",
    gpa: 3.90,
    internshipMonths: 10,
    projects: 5,
    skills: ["Product Design", "Prototyping", "User Research"],
    note: "Intern tại 2 design agency top",
    quadrant: "Q1",
    outcome: "success",
    trialResult: {
      verdict: "UX chuyên sâu",
      bullets: [
        "Conduct user interview 20 người, tạo persona và journey map chi tiết",
        "Prototype high-fidelity trong Figma với micro-interaction",
        "Design system align với WCAG 2.1 accessibility standards"
      ]
    },
    interviewAnswer: {
      question: 3,
      style: "concrete",
      text: "Khi variable fonts trở nên phổ biến, em tự nghiên cứu trên Google Fonts Lab, test 10 font families trên real project. Em tạo typography scale system dựa trên modular scale 1.25, apply vào design system. PM và dev đều impressed vì consistency cải thiện 40%, dev tiết kiệm thời gian implement."
    }
  },
  {
    id: "des_c04",
    name: "Phạm Thị Bích Thủy",
    gpa: 3.68,
    internshipMonths: 6,
    projects: 3,
    skills: ["Motion Design", "After Effects", "Visual Storytelling"],
    note: "Có 50K follower trên Dribbble",
    quadrant: "Q1",
    outcome: "success",
    trialResult: {
      verdict: "Đa năng sáng tạo",
      bullets: [
        "Tạo motion graphics cho marketing campaign tăng CTR 35%",
        "Design landing page A/B test version B thắng 22% conversion",
        "Làm việc tốt với dev team, cung cấp asset đúng spec"
      ]
    },
    interviewAnswer: {
      question: 1,
      style: "concrete",
      text: "PM muốn thay toàn bộ design em đã làm 2 tuần vì 'cảm thấy không đúng'. Em không phản đối ngay mà schedule meeting: ask PM chỉ cụ thể phần nào không OK, suggest fix từng phần thay vì redo all. Kết quả chỉ cần adjust 20% design. Em cũng đề xuất design review checkpoint mỗi 3 ngày để tránh tình huống lặp lại."
    }
  },

  // ── Q2: High GPA + Low practice → 4 fail + 1 wildcard success ──
  {
    id: "des_c05",
    name: "Hoàng Đức Phong",
    gpa: 3.88,
    internshipMonths: 0,
    projects: 0,
    skills: ["Design Theory", "Color Theory", "Principles"],
    note: "Điểm A thiết kế nhưng chưa có dự án thật",
    quadrant: "Q2",
    outcome: "fail",
    trialResult: {
      verdict: "Thiếu thực hành",
      bullets: [
        "Hiểu theory tốt nhưng design chưa đẹp mắt",
        "Chưa biết design responsive hay mobile-first",
        "File delivery không đúng spec cho developer"
      ]
    },
    interviewAnswer: {
      question: 2,
      style: "shallow",
      text: "Em sẽ lên kế hoạch và làm việc có hệ thống. Em nghĩ thiết kế cần sự tỉ mỉ và cẩn thận. Em luôn cố gắng hoàn thành công việc đúng deadline và đạt chất lượng cao nhất có thể."
    }
  },
  {
    id: "des_c06",
    name: "Đỗ Thị Lan",
    gpa: 3.82,
    internshipMonths: 0,
    projects: 1,
    skills: ["Typography", "Layout Theory"],
    note: "Bài tập lớn đẹp nhưng chưa có client",
    quadrant: "Q2",
    outcome: "fail",
    trialResult: {
      verdict: "Cần thực chiến",
      bullets: [
        "Typography rất chuẩn nhưng thiếu creativity trong layout",
        "Chưa biết handle real feedback từ client",
        "Design quá 'case study' style, thiếu commercial feel"
      ]
    },
    interviewAnswer: {
      question: 3,
      style: "shallow",
      text: "Em thường nghiên cứu trên Behance và Dribbble để cập nhật trend. Em cũng đọc các blog thiết kế và sách về UX. Em nghĩ việc nghiên cứu là rất quan trọng để tạo ra design tốt."
    }
  },
  {
    id: "des_c07",
    name: "Mai Văn Đức",
    gpa: 3.78,
    internshipMonths: 1,
    projects: 0,
    skills: ["Art History", "Aesthetics"],
    note: "Thực tập 1 tháng ở gallery, không làm digital",
    quadrant: "Q2",
    outcome: "fail",
    trialResult: {
      verdict: "Chưa đáp ứng",
      bullets: [
        "Hiểu nghệ thuật nhưng không thành thạo tool digital (Figma, PS)",
        "Chậm khi sketching UI wireframe",
        "Không biết process thiết kế sản phẩm digital"
      ]
    },
    interviewAnswer: {
      question: 1,
      style: "shallow",
      text: "Em nghĩ nghệ thuật là chủ quan nên mọi người có thể có ý kiến khác nhau. Em luôn lắng nghe feedback và điều chỉnh. Em tin rằng giao tiếp tốt là chìa khóa trong team thiết kế."
    }
  },
  {
    id: "des_c08",
    name: "Nguyễn Quang Hòa",
    gpa: 3.72,
    internshipMonths: 0,
    projects: 1,
    skills: ["Design Principles", "Composition"],
    note: "Chỉ có school projects",
    quadrant: "Q2",
    outcome: "fail",
    trialResult: {
      verdict: "Cải thiện cần",
      bullets: [
        "Design bài tập đẹp nhưng chưa biết handle real constraints",
        "Không có kinh nghiệm work với developer hay PM",
        "Chậm trong iteration khi cần thay đổi nhanh"
      ]
    },
    interviewAnswer: {
      question: 2,
      style: "shallow",
      text: "Em sẽ tập trung làm việc và ưu tiên những gì quan trọng nhất. Em nghĩ designer cần có thời gian để sáng tạo nên deadline nên được thảo luận kỹ. Em luôn nỗ lực hết mình trong mọi project."
    }
  },
  {
    id: "des_c09",
    name: "Lý Thị Hương",
    gpa: 3.85,
    internshipMonths: 2,
    projects: 1,
    skills: ["Quick Learner", "Design Sense", "Adaptable"],
    note: "Giỏi theory, cực kỳ nhạy bén khi làm project thật",
    quadrant: "Q2",
    outcome: "success",
    trialResult: {
      verdict: "Tiềm năng sáng tạo",
      bullets: [
        "Học Figma advanced trong 3 ngày, deliver screen đầu tiên",
        "Apply kiến thức color theory vào design system real project",
        "Feedback incorporation nhanh, iteration cycle ngắn"
      ]
    },
    interviewAnswer: {
      question: 3,
      style: "concrete",
      text: "Em chưa biết Figma auto layout nhưng được giao task. Em dành buổi tối xem Figma YouTube tutorial, practice trên 5 component cơ bản. Sáng hôm sau em apply vào project thật, design 10 screens trong 2 ngày. PM ấn tượng vì layout consistent, em cũng share auto layout tips cho 2 designer khác."
    }
  },

  // ── Q3: Low GPA + High practice → 4 success + 1 wildcard fail ──
  {
    id: "des_c10",
    name: "Phan Quốc Tuấn",
    gpa: 2.85,
    internshipMonths: 14,
    projects: 6,
    skills: ["Freelance Design", "Real Clients", "Multi-discipline"],
    note: "Freelance cho 30+ client, Behance featured",
    quadrant: "Q3",
    outcome: "success",
    trialResult: {
      verdict: "Thực chiến dày dặn",
      bullets: [
        "Thiết kế cho 30+ client đa ngành: F&B, tech, fashion",
        "Deliver full package: logo, social media, website mockup",
        "Repeat client rate 80%, nhiều khách giới thiệu thêm"
      ]
    },
    interviewAnswer: {
      question: 2,
      style: "concrete",
      text: "Client cần booth event design trong 3 ngày mà brief chưa rõ. Em lập tức call client clarify 5 key questions: size, brand colors, key message, target audience, budget. Em design 2 concept trong 24h, client chọn 1. Em加班 2 đêm hoàn thành full set: backdrop, standee, namecard. Event thành công, client ký hợp đồng design quarterly."
    }
  },
  {
    id: "des_c11",
    name: "Trần Thị Thanh Nhàn",
    gpa: 3.05,
    internshipMonths: 10,
    projects: 4,
    skills: ["Web Design", "Responsive Design", "HTML/CSS"],
    note: "Thiết kế và code website cho 10 khách hàng",
    quadrant: "Q3",
    outcome: "success",
    trialResult: {
      verdict: "Design + Dev",
      bullets: [
        "Design + code landing page đạt PageSpeed score 95+",
        "Tạo template website bán hàng convert rate 4.5%",
        "Hiểu limitation của code nên design feasible"
      ]
    },
    interviewAnswer: {
      question: 1,
      style: "concrete",
      text: "Em và copywriter bất đồng về visual hierarchy. Em đề xuất tạo 2 version: version A follow em (visual-first), version B follow copywriter (text-first). Em test với 10 user qua UsabilityHub, version A thắng ở first impression, version B thắng ở readability. Em combine best của cả hai: visual hero + structured text below. Cả hai đều happy."
    }
  },
  {
    id: "des_c12",
    name: "Vũ Văn Đức",
    gpa: 2.75,
    internshipMonths: 12,
    projects: 5,
    skills: ["Packaging Design", "Print Design", "Production"],
    note: "Thiết kế bao bì cho 3 thương hiệu FMCG",
    quadrant: "Q3",
    outcome: "success",
    trialResult: {
      verdict: "Production ready",
      bullets: [
        "Thiết kế bao bì passes quality check in-house print 100%",
        "Hiểu print production: CMYK, bleed, die-cut, material",
        "Redesign bao bì giúp tăng shelf appeal và sales 15%"
      ]
    },
    interviewAnswer: {
      question: 3,
      style: "concrete",
      text: "Khi công ty chuyển sang sustainable packaging, em tự research material options: kraft paper, bamboo fiber, biodegradable plastic. Em test mỗi material với 5 printer vendor, compare color accuracy và durability. Em tạo specification sheet cho production team, reduce error rate từ 8% xuống 1% trong quarter đầu tiên."
    }
  },
  {
    id: "des_c13",
    name: "Ngô Thị Kiều Anh",
    gpa: 2.95,
    internshipMonths: 8,
    projects: 3,
    skills: ["Social Media Design", "Campaign Visual", "Trend Sense"],
    note: "Design social content cho nhiều brand nổi tiếng",
    quadrant: "Q3",
    outcome: "success",
    trialResult: {
      verdict: "Trend catcher",
      bullets: [
        "Sản xuất 50+ social media assets cho campaign Tết",
        "Visual trend sense tốt, content luôn timely và viral-worthy",
        "Giao file đúng spec cho tất cả platform"
      ]
    },
    interviewAnswer: {
      question: 1,
      style: "concrete",
      text: "Em và marketing team bất đồng về visual direction cho Gen Z campaign. Em propose làm 3 moodboard: A (minimal), B (bold), C (meme-style). Em send quick poll cho 20 Gen Z target audience qua Instagram Story. Moodboard C win 60%. Marketing accept ngay vì có audience input. Campaign launch đạt 3M impression, 2x target."
    }
  },
  {
    id: "des_c14",
    name: "Bùi Quốc Anh",
    gpa: 2.80,
    internshipMonths: 7,
    projects: 3,
    skills: ["Illustration", "Character Design", "Creative"],
    note: "Skill vẽ rất tốt nhưng không chịu làm theo brief",
    quadrant: "Q3",
    outcome: "fail",
    trialResult: {
      verdict: "Thái độ vấn đề",
      bullets: [
        "Skill design rất tốt nhưng thường xuyên miss deadline",
        "Không follow brand guideline, tự ý thay đổi style",
        "Phản ứng tiêu cực khi nhận feedback từ client"
      ]
    },
    interviewAnswer: {
      question: 1,
      style: "shallow",
      text: "Em nghĩ designer nên có creative freedom. Nếu client không hiểu art thì đó là vấn đề của họ. Em không thích thiết kế theo brief vì nó giới hạn sự sáng tạo. Design là nghệ thuật chứ không phải service."
    }
  },

  // ── Q4: Low GPA + Low practice → 4 fail ──
  {
    id: "des_c15",
    name: "Lê Văn Huy",
    gpa: 2.50,
    internshipMonths: 0,
    projects: 0,
    skills: ["Photoshop basic"],
    note: "Chỉ biết dùng Photoshop cơ bản",
    quadrant: "Q4",
    outcome: "fail",
    trialResult: {
      verdict: "Chưa đáp ứng",
      bullets: [
        "Chỉ biết chỉnh sửa ảnh cơ bản trên Photoshop",
        "Chưa có kiến thức về UI/UX hay design principles",
        "Portfolio trống, không có project nào"
      ]
    },
    interviewAnswer: {
      question: 2,
      style: "shallow",
      text: "Em sẽ cố gắng hết sức để hoàn thành công việc. Em nghĩ thiết kế cần thời gian và sự sáng tạo. Em sẽ nỗ lực học hỏi từ đồng nghiệp và các nguồn trên Internet."
    }
  },
  {
    id: "des_c16",
    name: "Đinh Thị Thảo Vy",
    gpa: 2.60,
    internshipMonths: 1,
    projects: 0,
    skills: ["Canva"],
    note: "Dùng Canva thiết kế cho CLB",
    quadrant: "Q4",
    outcome: "fail",
    trialResult: {
      verdict: "Cải thiện nhiều",
      bullets: [
        "Chỉ dùng Canva template, chưa biết design từ zero",
        "Thiếu kiến thức về color theory và typography",
        "Cần training toàn diện về design fundamentals"
      ]
    },
    interviewAnswer: {
      question: 3,
      style: "shallow",
      text: "Em thường xem các video hướng dẫn thiết kế trên YouTube. Em cũng tham gia các group thiết kế trên Facebook để học hỏi. Em nghĩ tự học là cách tốt nhất để cải thiện kỹ năng."
    }
  },
  {
    id: "des_c17",
    name: "Phạm Quốc Thắng",
    gpa: 2.40,
    internshipMonths: 0,
    projects: 0,
    skills: ["Drawing basic"],
    note: "Biết vẽ tay nhưng không biết digital design",
    quadrant: "Q4",
    outcome: "fail",
    trialResult: {
      verdict: "Không phù hợp",
      bullets: [
        "Vẽ tay khá nhưng không thành thạo tool digital",
        "Không có portfolio online",
        "GPA thấp, thiếu nỗ lực trong học tập"
      ]
    },
    interviewAnswer: {
      question: 1,
      style: "shallow",
      text: "Em sẽ lắng nghe ý kiến mọi người và cố gắng hòa nhập với team. Em nghĩ thiết kế là công việc cần sự hợp tác. Em luôn sẵn sàng nhận góp ý để hoàn thiện bản thân."
    }
  },
  {
    id: "des_c18",
    name: "Hoàng Thị Diệu Anh",
    gpa: 2.55,
    internshipMonths: 1,
    projects: 0,
    skills: ["PPT basic"],
    note: "Chuyển từ kỹ thuật sang thiết kế",
    quadrant: "Q4",
    outcome: "fail",
    trialResult: {
      verdict: "Cần học thêm",
      bullets: [
        "Chỉ biết làm PowerPoint cơ bản",
        "Thiếu tư duy thẩm mỹ và sáng tạo",
        "Cần ít nhất 6 tháng training design fundamentals"
      ]
    },
    interviewAnswer: {
      question: 2,
      style: "shallow",
      text: "Em sẽ phân công thời gian hợp lý và làm việc chăm chỉ. Em biết mình mới bắt đầu nên cần nỗ lực nhiều hơn. Em tin rằng nếu có ý chí thì mọi thứ đều có thể học được."
    }
  },

  // ── Wildcards ──
  {
    id: "des_c19",
    name: "Cao Thị Minh Anh",
    gpa: 3.15,
    internshipMonths: 0,
    projects: 5,
    skills: ["Self-taught", "YouTube Creator", "Award Winning"],
    note: "Tự học qua YouTube, đạt giải national design competition",
    quadrant: "WILD",
    outcome: "success",
    trialResult: {
      verdict: "Tự học bẩm sinh",
      bullets: [
        "Đạt giải nhất cuộc thi design quốc gia tự học hoàn toàn",
        "Portfolio online 10K views, nhiều inquiry từ startup",
        "Design sense tự nhiên, không cần formal training"
      ]
    },
    interviewAnswer: {
      question: 3,
      style: "concrete",
      text: "Em tự học design qua The Futur YouTube channel, bắt đầu từ typography fundamentals. Em practice mỗi ngày: design 1 poster/ngày trong 100 ngày liên tiếp, post lên Instagram. Người theo dõi反馈 giúp em improve nhanh hơn bất kỳ course nào. Sau đó em tham gia competition và đạt giải nhất, proof rằng self-taught có thể rival formal education."
    }
  },
  {
    id: "des_c20",
    name: "Đặng Văn Quang",
    gpa: 3.55,
    internshipMonths: 7,
    projects: 4,
    skills: ["High Skill", "Portfolio Strong", "Difficult"],
    note: "Skill design rất cao nhưng khó hợp tác",
    quadrant: "WILD",
    outcome: "fail",
    trialResult: {
      verdict: "Khó hợp tác",
      bullets: [
        "Portfolio đẹp xuất sắc nhưng không chịu iterate theo feedback",
        "Tự quyết design mà không thảo luận với PM hay stakeholder",
        "Attitude arrogant, cho rằng design của mình là 'perfect'"
      ]
    },
    interviewAnswer: {
      question: 1,
      style: "shallow",
      text: "Em nghĩ nếu design của em tốt thì không cần phải thay đổi. Feedback từ người không phải designer không có giá trị. Em đã spend nhiều năm perfect skill của mình và không cần người khác dạy em cách design."
    }
  }
];
