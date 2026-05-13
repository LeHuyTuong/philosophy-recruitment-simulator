import type { Candidate } from './types';

export const candidates: Candidate[] = [
  // ── Q1: High GPA + High practice → 4 success ──
  {
    id: "mkt_c01",
    name: "Phạm Thị Ngọc",
    gpa: 3.80,
    internshipMonths: 8,
    projects: 3,
    skills: ["Facebook Ads", "Google Analytics", "Content Strategy"],
    note: "Vừa học giỏi vừa freelance content",
    quadrant: "Q1",
    outcome: "success",
    trialResult: {
      verdict: "Sáng tạo + Data",
      bullets: [
        "Tạo campaign Facebook Ads đạt ROAS 5.2x trong tháng thử",
        "Viết 15 bài content SEO, top 10 Google cho 8 keyword",
        "Setup dashboard GA4 track toàn bộ funnel marketing"
      ]
    },
    interviewAnswer: {
      question: 1,
      style: "concrete",
      text: "Làm campaign Tết, team content và ads không đồng ý budget split. Em đề xuất A/B test: 70-30 trong tuần đầu, xem data rồi điều chỉnh. Content win ở CTR, ads win ở conversion. Cuối cùng chọn 50-50, cả hai đều hài vì có data minh chứng."
    }
  },
  {
    id: "mkt_c02",
    name: "Hoàng Trọng Nghĩa",
    gpa: 3.72,
    internshipMonths: 7,
    projects: 3,
    skills: ["SEO", "Copywriting", "Email Marketing"],
    note: "Freelance SEO cho 3 local business",
    quadrant: "Q1",
    outcome: "success",
    trialResult: {
      verdict: "Hiệu quả cao",
      bullets: [
        "Optimize 20 trang web lên top 5 Google trong 3 tháng",
        "Write email sequence có open rate 35%, click rate 12%",
        "Nghiên cứu competitor xuất sắc, đề xuất 5 USP mới"
      ]
    },
    interviewAnswer: {
      question: 2,
      style: "concrete",
      text: "Sếp yêu cầu launch campaign trong 3 ngày mà KOL chưa confirm. Em lập tức lên danh sách 10 micro-influencer backup, đồng thời negotiate với KOL chính bằng deal profit-sharing thay vì fixed fee. Result: 8/10 đồng ý, campaign launch đúng giờ với reach gấp 2x kế hoạch."
    }
  },
  {
    id: "mkt_c03",
    name: "Vũ Mai Anh",
    gpa: 3.88,
    internshipMonths: 10,
    projects: 4,
    skills: ["Google Ads", "Analytics", "Brand Strategy"],
    note: "Intern tại 2 agency top",
    quadrant: "Q1",
    outcome: "success",
    trialResult: {
      verdict: "Toàn diện",
      bullets: [
        "Quản lý Google Ads budget 100 triệu/tháng, CPA giảm 25%",
        "Build brand guideline mới cho client F&B",
        "Trình bày report rõ ràng cho cả tech và non-tech audience"
      ]
    },
    interviewAnswer: {
      question: 3,
      style: "concrete",
      text: "Khi TikTok Ads mới ra VN, em tự chạy experiment 500K/ngày trong 2 tuần, test 30 creatives khác nhau. Em phát hiện video dạng storytelling dài 30s perform tốt nhất ở demo 25-34. Em viết case study, present cho director, sau đó áp dụng cho 3 client lớn."
    }
  },
  {
    id: "mkt_c04",
    name: "Lê Thị Hồng Nhung",
    gpa: 3.65,
    internshipMonths: 6,
    projects: 2,
    skills: ["Content Marketing", "Social Media", "Canva Pro"],
    note: "Quản lý fanpage 50K follower lúc sinh viên",
    quadrant: "Q1",
    outcome: "success",
    trialResult: {
      verdict: "Hoàn thành tốt",
      bullets: [
        "Tăng engagement rate fanpage từ 2% lên 5.8% trong 1 tháng",
        "Sản xuất 20 reel/video ngắn đạt view trung bình 10K",
        "Nắm bắt trend nhanh, content luôn timely và relevant"
      ]
    },
    interviewAnswer: {
      question: 1,
      style: "concrete",
      text: "Designer và em bất đồng về visual content. Em đề xuất làm 2 version: 1 theo ý designer, 1 theo insight data audience thích gì. Đăng cả hai, track 48h. Version data-driven thắng 3x engagement. Từ đó designer tự nguyện hỏi em trước khi design."
    }
  },

  // ── Q2: High GPA + Low practice → 4 fail + 1 wildcard success ──
  {
    id: "mkt_c05",
    name: "Nguyễn Đức Phong",
    gpa: 3.92,
    internshipMonths: 0,
    projects: 0,
    skills: ["Marketing Theory", "4P Model", "Consumer Behavior"],
    note: "Điểm A tất cả môn marketing, chưa làm việc thật",
    quadrant: "Q2",
    outcome: "fail",
    trialResult: {
      verdict: "Thiếu thực chiến",
      bullets: [
        "Phân tích case study rất hay nhưng không setup campaign được",
        "Chưa biết dùng Facebook Business Manager hay Google Ads",
        "Content viết quá 'học thuật', không phù hợp social media"
      ]
    },
    interviewAnswer: {
      question: 3,
      style: "shallow",
      text: "Em thường đọc sách marketing và theo dõi các blog chuyên ngành. Em nghĩ kiến thức nền tảng rất quan trọng để làm marketing. Em cũng thường tham gia các seminar và workshop về digital marketing ở trường."
    }
  },
  {
    id: "mkt_c06",
    name: "Trần Anh Tuấn",
    gpa: 3.85,
    internshipMonths: 0,
    projects: 1,
    skills: ["Brand Management", "Market Research"],
    note: "Làm bài tập lớn xuất sắc, chưa có client thật",
    quadrant: "Q2",
    outcome: "fail",
    trialResult: {
      verdict: "Cần kinh nghiệm",
      bullets: [
        "Report survey rất chi tiết nhưng không biết tóm tắt cho client",
        "Thiếu kỹ năng negotiation với vendor và KOL",
        "Quản lý thời gian yếu, chậm deadline thực tế"
      ]
    },
    interviewAnswer: {
      question: 2,
      style: "shallow",
      text: "Em sẽ lập kế hoạch chi tiết và phân công công việc rõ ràng. Em nghĩ planning là chìa khóa để đối mặt với deadline gấp. Nếu gặp vấn đề khó em sẽ tìm kiếm sự giúp đỡ từ đồng nghiệp hoặc mentor."
    }
  },
  {
    id: "mkt_c07",
    name: "Đinh Thị Mai",
    gpa: 3.78,
    internshipMonths: 1,
    projects: 0,
    skills: ["PR Theory", "Crisis Management"],
    note: "Thực tập 1 tháng ở PR agency rồi nghỉ",
    quadrant: "Q2",
    outcome: "fail",
    trialResult: {
      verdict: "Chưa đáp ứng",
      bullets: [
        "Viết press release theo form mẫu, chưa linh hoạt theo brand voice",
        "Không tự tin khi pitch idea cho client",
        "Phản ứng chậm khi handle objection từ media"
      ]
    },
    interviewAnswer: {
      question: 1,
      style: "shallow",
      text: "Em nghĩ trong team mọi người nên tôn trọng nhau và lắng nghe ý kiến. Xung đột là điều không tránh khỏi nhưng có thể giải quyết bằng giao tiếp tốt. Em luôn cố gắng giữ thái độ tích cực và chuyên nghiệp."
    }
  },
  {
    id: "mkt_c08",
    name: "Bùi Quang Vinh",
    gpa: 3.70,
    internshipMonths: 0,
    projects: 1,
    skills: ["Strategic Marketing", "SWOT Analysis"],
    note: "Giỏi phân tích, ngại execution",
    quadrant: "Q2",
    outcome: "fail",
    trialResult: {
      verdict: "Cải thiện execution",
      bullets: [
        "Plan rất hay nhưng không implement được",
        "Mắc kẹt ở phân tích, không đưa ra action được",
        "Không chịu làm task operation như chạy ads hay post content"
      ]
    },
    interviewAnswer: {
      question: 2,
      style: "shallow",
      text: "Em sẽ ưu tiên giải quyết vấn đề quan trọng nhất trước. Em thường dùng ma trận Eisenhower để sắp xếp công việc. Em tin rằng nếu phân tích tốt thì execution sẽ tự nhiên theo."
    }
  },
  {
    id: "mkt_c09",
    name: "Lý Khánh Huyền",
    gpa: 3.90,
    internshipMonths: 2,
    projects: 1,
    skills: ["Marketing Analytics", "Data-driven", "Quick Learner"],
    note: "Giỏi theory, cực kỳ học hỏi nhanh khi va chạm thực tế",
    quadrant: "Q2",
    outcome: "success",
    trialResult: {
      verdict: "Tiềm năng lớn",
      bullets: [
        "Học Facebook Ads trong 3 ngày, chạy được campaign đầu tiên",
        "Apply statistical knowledge vào phân tích A/B test chuẩn xác",
        "Nghiên cứu深夜 competitive analysis cho 3 đối thủ chính"
      ]
    },
    interviewAnswer: {
      question: 3,
      style: "concrete",
      text: "Em chưa biết chạy TikTok Ads nhưng được giao thử. Em dành 2 buổi tối học qua TikTok Academy, phân tích 50 ads đối thủ bằng TikTok Creative Center, rồi đề xuất format video dựa trên data trending. Tuần sau campaign launch, CPM thấp hơn industry average 40%."
    }
  },

  // ── Q3: Low GPA + High practice → 4 success + 1 wildcard fail ──
  {
    id: "mkt_c10",
    name: "Phan Văn Đạt",
    gpa: 2.90,
    internshipMonths: 12,
    projects: 5,
    skills: ["Performance Marketing", "Real Ad Spend", "Lead Gen"],
    note: "Tự kinh doanh online, doanh thu 200tr/năm",
    quadrant: "Q3",
    outcome: "success",
    trialResult: {
      verdict: "Thực chiến sương máu",
      bullets: [
        "Quản lý ad spend 50tr/tháng cho chính business của mình",
        "Tạo funnel lead gen chuyển đổi 8% từ click đến purchase",
        "Hiểu rõ customer journey vì tự trải nghiệm toàn bộ process"
      ]
    },
    interviewAnswer: {
      question: 2,
      style: "concrete",
      text: "Lần đó chạy mega sale 11/11, ad account bị disapproved lúc 0h. Em lập tức split budget sang Shopee Ads và TikTok Ads backup, đồng thời appeal Facebook qua chat support. 2h sau account được khôi phục. Tổng doanh thu ngày đó vẫn đạt 150% target vì em đa dạng channel."
    }
  },
  {
    id: "mkt_c11",
    name: "Ngô Thị Thanh Tâm",
    gpa: 3.05,
    internshipMonths: 9,
    projects: 4,
    skills: ["Social Media Management", "Influencer Marketing", "Event"],
    note: "Part-time 3 agency đồng thời",
    quadrant: "Q3",
    outcome: "success",
    trialResult: {
      verdict: "Năng động",
      bullets: [
        "Tổ chức event launch sản phẩm cho 200+ khách mời",
        "Quản lý 10 micro-influencer, deliver content đúng deadline",
        "Tăng follower Instagram client từ 5K lên 25K trong 3 tháng"
      ]
    },
    interviewAnswer: {
      question: 1,
      style: "concrete",
      text: "Influencer hủy hợp đồng 2 ngày trước event. Em gọi điện negotiate, offer thêm benefit: feature trên 3 kênh social thay vì 1, và赠送 product sample set. Influencer đồng ý, và nhờ đó em build được mối quan hệ dài hạn. Em giờ luôn có backup list sẵn sàng."
    }
  },
  {
    id: "mkt_c12",
    name: "Trịnh Quốc Việt",
    gpa: 2.75,
    internshipMonths: 10,
    projects: 3,
    skills: ["Content Creator", "Video Production", "TikTok"],
    note: "Channel TikTok cá nhân 80K follower",
    quadrant: "Q3",
    outcome: "success",
    trialResult: {
      verdict: "Sáng tạo",
      bullets: [
        "Sản xuất 15 video TikTok cho brand, 5 video viral trên 100K view",
        "Edit video nhanh, hiểu algorithm platform tốt",
        "Đề xuất format content mới giúp tăng follower 300% trong tháng"
      ]
    },
    interviewAnswer: {
      question: 3,
      style: "concrete",
      text: "Khi short-form content lên ngôi, em tự test 10 format khác nhau trên kênh cá nhân: storytelling, POV, duet, react, tutorial. Format 'behind-the-scenes POV' win nhất với avg 50K views. Em apply ngay cho client FMCG và tăng brand awareness 45% trong quarter."
    }
  },
  {
    id: "mkt_c13",
    name: "Hoàng Thị Thu Hiền",
    gpa: 2.95,
    internshipMonths: 8,
    projects: 3,
    skills: ["CRM Marketing", "Email Automation", "Customer Retention"],
    note: "Tự setup CRM cho quán cafe gia đình",
    quadrant: "Q3",
    outcome: "success",
    trialResult: {
      verdict: "Hiểu customer",
      bullets: [
        "Setup email automation workflow giảm churn rate 15%",
        "Segment customer database thành 5 nhóm, personalized content từng nhóm",
        "Tạo loyalty program tăng repeat purchase 22%"
      ]
    },
    interviewAnswer: {
      question: 1,
      style: "concrete",
      text: "Sales và marketing không đồng ý về lead qualification criteria. Em đề xuất cả hai ngồi lại với 1 spreadsheet: sales list ra 10 lead real mà marketing cho là 'good', marketing list ra 10 criteria. Em overlap 2 list, tìm được 6 criteria chung. Bây giờ cả hai team đều đồng ý dùng scoring model chung."
    }
  },
  {
    id: "mkt_c14",
    name: "Dương Văn Hoàng",
    gpa: 2.80,
    internshipMonths: 7,
    projects: 2,
    skills: ["Growth Hacking", "A/B Testing", "Analytics"],
    note: "Skill tốt nhưng hay cãi lý với sếp",
    quadrant: "Q3",
    outcome: "fail",
    trialResult: {
      verdict: "Thái độ vấn đề",
      bullets: [
        "Kỹ năng analytics rất tốt nhưng không chịu follow brand guideline",
        "Hay chỉ trích strategy cũ mà không đưa giải pháp thay thế",
        "Từ chối làm task 'bình thường' vì cho là 'creative waste'"
      ]
    },
    interviewAnswer: {
      question: 1,
      style: "shallow",
      text: "Em nghĩ nếu ý kiến em đúng thì nên坚持. Mọi người đôi khi không hiểu tầm nhìn dài hạn. Em không thích làm việc theo cách cũ chỉ vì 'vậy là an toàn'. Team cần người dám thay đổi chứ không phải người sheep."
    }
  },

  // ── Q4: Low GPA + Low practice → 4 fail ──
  {
    id: "mkt_c15",
    name: "Lê Văn Quý",
    gpa: 2.45,
    internshipMonths: 0,
    projects: 0,
    skills: ["Basic Office", "Canva basic"],
    note: "Mới ra trường, chưa có kinh nghiệm",
    quadrant: "Q4",
    outcome: "fail",
    trialResult: {
      verdict: "Chưa đáp ứng",
      bullets: [
        "Chỉ biết thiết kế cơ bản trên Canva",
        "Chưa có kiến thức về digital marketing tools",
        "Cần training toàn diện trước khi có thể làm việc"
      ]
    },
    interviewAnswer: {
      question: 2,
      style: "shallow",
      text: "Em sẽ cố gắng làm hết sức mình. Nếu khó quá em sẽ nhờ mọi người giúp đỡ. Em nghĩ quan trọng nhất là thái độ cầu thị và sẵn sàng học hỏi từ mọi người xung quanh."
    }
  },
  {
    id: "mkt_c16",
    name: "Nguyễn Thị Bích Ngọc",
    gpa: 2.60,
    internshipMonths: 1,
    projects: 0,
    skills: ["Office", "Social Media personal"],
    note: "Chỉ dùng Facebook cá nhân",
    quadrant: "Q4",
    outcome: "fail",
    trialResult: {
      verdict: "Cải thiện nhiều",
      bullets: [
        "Chưa phân biệt được organic và paid reach",
        "Không có concept về conversion funnel hay ROI",
        "Viết content chưa cuốn hút, thiếu call-to-action"
      ]
    },
    interviewAnswer: {
      question: 3,
      style: "shallow",
      text: "Em thường đọc các bài viết trên mạng và xem YouTube để học hỏi. Em nghĩ marketing là ngành cần cập nhật liên tục nên em sẽ cố gắng tự học mỗi ngày. Em cũng có theo dõi một số page marketing nổi tiếng."
    }
  },
  {
    id: "mkt_c17",
    name: "Phạm Quốc Sơn",
    gpa: 2.35,
    internshipMonths: 0,
    projects: 0,
    skills: ["Basic Computer"],
    note: "GPA thấp, không có định hướng marketing",
    quadrant: "Q4",
    outcome: "fail",
    trialResult: {
      verdict: "Không phù hợp",
      bullets: [
        "Không có kiến thức cơ bản về marketing",
        "Không có portfolio hay project nào",
        "Thiếu đam mê và sự quan tâm đến ngành marketing"
      ]
    },
    interviewAnswer: {
      question: 1,
      style: "shallow",
      text: "Em nghĩ mọi người nên hòa thuận với nhau. Nếu có mâu thuẫn thì nói chuyện rõ ràng là được. Em là người dễ tính nên chưa từng gặp xung đột lớn trong nhóm ở trường."
    }
  },
  {
    id: "mkt_c18",
    name: "Trần Thị Lan Phương",
    gpa: 2.55,
    internshipMonths: 1,
    projects: 0,
    skills: ["PowerPoint"],
    note: "Chuyển ngành từ ngôn ngữ Anh sang marketing",
    quadrant: "Q4",
    outcome: "fail",
    trialResult: {
      verdict: "Cần học thêm",
      bullets: [
        "Kỹ năng presentation tốt nhưng thiếu kiến thức chuyên ngành",
        "Chưa biết phân tích data hay viết strategic plan",
        "Cần nhiều thời gian để catch up kiến thức nền"
      ]
    },
    interviewAnswer: {
      question: 2,
      style: "shallow",
      text: "Em sẽ ưu tiên làm phần dễ trước rồi đến phần khó. Em thường làm việc theo nhóm ở trường nên biết cách phân công. Em tin rằng nếu mọi người đoàn kết thì sẽ vượt qua khó khăn."
    }
  },

  // ── Wildcards ──
  {
    id: "mkt_c19",
    name: "Cao Minh Tú",
    gpa: 3.15,
    internshipMonths: 0,
    projects: 5,
    skills: ["Self-taught", "TikTok Growth", "Content Creator"],
    note: "Tự build TikTok 100K follower và monetize",
    quadrant: "WILD",
    outcome: "success",
    trialResult: {
      verdict: "Tự học xuất sắc",
      bullets: [
        "Build 2 kênh TikTok tổng 200K follower tự học hoàn toàn",
        "Thu nhập passive từ TikTok Shop 30tr/tháng khi còn đi học",
        "Hiểu algorithm và trend intuitively, data-driven decision making"
      ]
    },
    interviewAnswer: {
      question: 3,
      style: "concrete",
      text: "Em tự build TikTok từ 0: đầu tiên study 100 videos viral trong niche, phân tích hook, retention rate, và CTA. Em test 3 format/tuần, track bằng spreadsheet. Format 'unboxing + review chân thực' win nhất, em scale lên 10 videos/tuần. 4 tháng sau đạt 100K và nhận được 5 brand deal."
    }
  },
  {
    id: "mkt_c20",
    name: "Đặng Hoàng Nam",
    gpa: 3.45,
    internshipMonths: 6,
    projects: 3,
    skills: ["Strategic Thinking", "Analytics", "Skilled"],
    note: "Học giỏi + kinh nghiệm + thái độ kiêu căng",
    quadrant: "WILD",
    outcome: "fail",
    trialResult: {
      verdict: "Thái độ kiêu ngạo",
      bullets: [
        "Kỹ năng marketing rất tốt nhưng không chịu feedback",
        "Tự quyết campaign mà không xin ý kiến team lead",
        "Nói xấu strategy công ty trước mặt client"
      ]
    },
    interviewAnswer: {
      question: 1,
      style: "shallow",
      text: "Em nghĩ nếu em đúng về mặt data thì không cần phải thương lượng. Marketing là khoa học, không phải dân chủ. Nếu team không chịu nghe em thì đó là vấn đề của team chứ không phải của em."
    }
  }
];
