import type { Candidate } from './types';

export const candidates: Candidate[] = [
  // ── Q1: High GPA + High practice → 4 success ──
  {
    id: "biz_c01",
    name: "Trần Quang Huy",
    gpa: 3.78,
    internshipMonths: 8,
    projects: 3,
    skills: ["B2B Sales", "CRM", "Negotiation"],
    note: "Đạt 120% KPI ở công ty FMCG",
    quadrant: "Q1",
    outcome: "success",
    trialResult: {
      verdict: "Deal maker",
      bullets: [
        "Đóng 5 deal B2B trong tháng thử việc, trị giá 2 tỷ",
        "Xây pipeline CRM chuẩn, follow-up rate 100%",
        "Negotiate discount từ 30% xuống chỉ 15% cho khách hàng lớn"
      ]
    },
    interviewAnswer: {
      question: 1,
      style: "concrete",
      text: "Em và sales lead tranh nhau territory khách hàng. Em đề xuất chia theo industry vertical thay vì geographic, vì em phân tích data CRM thấy có overlap 40%. Lead đồng ý sau khi em show dashboard. Result: cả hai đều tăng 20% pipeline vì không còn competing nhau."
    }
  },
  {
    id: "biz_c02",
    name: "Nguyễn Thị Mai Phương",
    gpa: 3.70,
    internshipMonths: 7,
    projects: 2,
    skills: ["Key Account Management", "Presentation", "Cross-selling"],
    note: "Top sales intern tại Unilever",
    quadrant: "Q1",
    outcome: "success",
    trialResult: {
      verdict: "Chuyên nghiệp",
      bullets: [
        "Maintain 95% retention rate cho existing accounts",
        "Upsell thành công cho 3 khách hàng từ basic sang premium",
        "Presentation proposal cho board director thành công"
      ]
    },
    interviewAnswer: {
      question: 2,
      style: "concrete",
      text: "Client muốn discount 25% cho hợp đồng 1 tỷ mà em chỉ được quyền approve 15%. Em gọi meeting với manager, đề xuất counter-offer: giảm 10% giá + tặng 3 tháng support + training cho staff. Client agreed vì total value cao hơn. Em document deal structure để team reuse cho similar cases."
    }
  },
  {
    id: "biz_c03",
    name: "Lê Hoàng Nam",
    gpa: 3.88,
    internshipMonths: 10,
    projects: 4,
    skills: ["Business Development", "Market Entry", "Strategic Planning"],
    note: "Intern tại Vingroup strategy team",
    quadrant: "Q1",
    outcome: "success",
    trialResult: {
      verdict: "Tư duy chiến lược",
      bullets: [
        "Phân tích market entry cho 2 tỉnh mới, đề xuất được phê duyệt",
        "Build relationship với 15 distributor trong 1 tháng",
        "Đào tạo được 3 sales rep mới về consultative selling"
      ]
    },
    interviewAnswer: {
      question: 3,
      style: "concrete",
      text: "Khi công ty áp dụng SPIN selling, em chưa biết framework này. Em đọc book của Neil Rackham trong 3 ngày, identify 5 situation questions + 3 problem questions cho product của mình. Tuần sau apply vào pitch cho khách B2B, close deal 500 triệu. Em share play- book với cả team sales."
    }
  },
  {
    id: "biz_c04",
    name: "Phạm Thị Ngọc Anh",
    gpa: 3.65,
    internshipMonths: 6,
    projects: 2,
    skills: ["Retail Sales", "Customer Service", "Merchandising"],
    note: "Quản lý cửa hàng demo trong trường",
    quadrant: "Q1",
    outcome: "success",
    trialResult: {
      verdict: "Hiểu khách hàng",
      bullets: [
        "Tăng revenue cửa hàng demo 60% trong 1 semester",
        "Giảm customer complaint rate từ 5% xuống 0.5%",
        "Setup loyalty program thu hút 200+ member mới"
      ]
    },
    interviewAnswer: {
      question: 1,
      style: "concrete",
      text: "Marketing chạy promo mà sales không được báo trước, khách đến hỏi em không biết. Em lập tức call marketing, yêu cầu gửi promo details trong group Zalo chung. Em cũng đề xuất tạo SOP: marketing gửi promo brief 48h trước launch cho sales. Sau đó không còn bị surprise nữa."
    }
  },

  // ── Q2: High GPA + Low practice → 4 fail + 1 wildcard success ──
  {
    id: "biz_c05",
    name: "Hoàng Đức Tuấn",
    gpa: 3.92,
    internshipMonths: 0,
    projects: 0,
    skills: ["Business Strategy", "Case Interview", "Theory"],
    note: "Giỏi giải case nhưng chưa close deal nào",
    quadrant: "Q2",
    outcome: "fail",
    trialResult: {
      verdict: "Thiếu thực chiến",
      bullets: [
        "Phân tích case rất tốt nhưng không biết approach khách hàng thật",
        "Chưa có kinh nghiệm cold calling hay negotiation",
        "Elastic khi bị khách hàng từ chối"
      ]
    },
    interviewAnswer: {
      question: 3,
      style: "shallow",
      text: "Em thường đọc sách về kinh doanh và strategy. Em nghĩ kiến thức nền tảng rất quan trọng để làm sales. Em cũng hay tham gia các cuộc thi case competition để rèn luyện tư duy phân tích."
    }
  },
  {
    id: "biz_c06",
    name: "Đỗ Thị Hồng Yến",
    gpa: 3.85,
    internshipMonths: 0,
    projects: 1,
    skills: ["Market Research", "Competitive Analysis"],
    note: "Nghiên cứu thị trường giỏi nhưng chưa bán hàng",
    quadrant: "Q2",
    outcome: "fail",
    trialResult: {
      verdict: "Cần kinh nghiệm",
      bullets: [
        "Report chi tiết nhưng không có actionable recommendations",
        "Không tự tin khi talk trực tiếp với khách hàng",
        "Mất quá nhiều thời gian phân tích mà quên execution"
      ]
    },
    interviewAnswer: {
      question: 2,
      style: "shallow",
      text: "Em sẽ lập kế hoạch và ưu tiên công việc theo mức độ quan trọng. Em nghĩ nếu phân tích tốt thì việc còn lại sẽ dễ dàng hơn. Em luôn cố gắng hoàn thành công việc với chất lượng cao nhất có thể."
    }
  },
  {
    id: "biz_c07",
    name: "Vũ Văn Bình",
    gpa: 3.78,
    internshipMonths: 1,
    projects: 0,
    skills: ["MBA Theory", "Leadership"],
    note: "Đọc nhiều sách quản trị, chưa làm quản lý",
    quadrant: "Q2",
    outcome: "fail",
    trialResult: {
      verdict: "Chưa đáp ứng",
      bullets: [
        "Nói chuyện rất hay nhưng không convert được thành sale",
        "Chưa biết xử lý objection khi khách hàng chê giá",
        "Thiếu kỹ năng thực tế như viết proposal hay contract"
      ]
    },
    interviewAnswer: {
      question: 1,
      style: "shallow",
      text: "Em nghĩ leader cần lắng nghe nhân viên và đưa ra quyết định công bằng. Xung đột là cơ hội để cải thiện quy trình. Em luôn cố gắng giữ thái độ tích cực và khuyến khích mọi người cùng phát triển."
    }
  },
  {
    id: "biz_c08",
    name: "Cao Thị Thu Hiền",
    gpa: 3.72,
    internshipMonths: 0,
    projects: 1,
    skills: ["Strategic Planning", "SWOT", "Porter's Five Forces"],
    note: "Phân tích tài liệu hay, ngại gặp người thật",
    quadrant: "Q2",
    outcome: "fail",
    trialResult: {
      verdict: "Cải thiện giao tiếp",
      bullets: [
        "Khá ngại giao tiếp, không mở được cuộc trò chuyện với khách",
        "Nói lắp khi bị hỏi câu hỏi bất ngờ",
        "Phù hợp làm research hơn sales"
      ]
    },
    interviewAnswer: {
      question: 2,
      style: "shallow",
      text: "Em sẽ chuẩn bị kỹ trước khi gặp khách hàng. Em nghĩ cần research thật kỹ về khách hàng và sản phẩm để tự tin hơn. Em sẽ nỗ lực cải thiện kỹ năng giao tiếp của mình."
    }
  },
  {
    id: "biz_c09",
    name: "Trịnh Văn Khôi",
    gpa: 3.90,
    internshipMonths: 2,
    projects: 1,
    skills: ["Quick Learner", "Analytical", "Adaptable"],
    note: "Giỏi lý thuyết, học cực nhanh khi gặp khách thật",
    quadrant: "Q2",
    outcome: "success",
    trialResult: {
      verdict: "Tiềm năng sale star",
      bullets: [
        "Học product knowledge trong 2 ngày, demo cho client ngay",
        "Apply framework consultative selling sau 1 tuần observe senior",
        "Close first deal trị giá 300 triệu trong tháng đầu thử việc"
      ]
    },
    interviewAnswer: {
      question: 1,
      style: "concrete",
      text: "Em mới vào team, bị senior territory conflict. Em đề xuất mình cover SME segment còn senior cover enterprise. Em prove khả năng bằng cách research 50 SME trong area, qualify 15 hot lead, close 3 deal trong 2 tuần. Senior impressed và voluntary share enterprise leads cho em."
    }
  },

  // ── Q3: Low GPA + High practice → 4 success + 1 wildcard fail ──
  {
    id: "biz_c10",
    name: "Ngô Văn Sơn",
    gpa: 2.90,
    internshipMonths: 18,
    projects: 5,
    skills: ["Real Sales", "Pipeline Management", "Closing"],
    note: "Top performer 1.5 năm tại công ty B2B",
    quadrant: "Q3",
    outcome: "success",
    trialResult: {
      verdict: "Sinh ra để bán",
      bullets: [
        "Đạt 150% quota trong quý đầu tiên thử việc",
        "Build pipeline 2 tỷ từ cold calling 200 số/ngày",
        "Convert rate 12% (industry average: 5%)"
      ]
    },
    interviewAnswer: {
      question: 2,
      style: "concrete",
      text: "Deadline close quarter, 3 deal pending. Em rank theo probability: deal A 80%, B 50%, C 30%. Em focus 70% thời gian cho A, negotiate payment term trực tiếp với CFO client. Deal close. Đối B, em tạo urgency bằng limited-time offer. Deal close. Deal C em push sang quarter sau nhưng lock commitment. Kết quả: vượt target 20%."
    }
  },
  {
    id: "biz_c11",
    name: "Lê Thị Trâm",
    gpa: 3.05,
    internshipMonths: 12,
    projects: 4,
    skills: ["Inside Sales", "Cold Calling", "CRM HubSpot"],
    note: "Part-time sales 3 semester cuối",
    quadrant: "Q3",
    outcome: "success",
    trialResult: {
      verdict: "Kiên trì hiệu quả",
      bullets: [
        "Make 500+ calls/tháng, consistently hit target",
        "Reduce average sales cycle từ 45 ngày xuống 28 ngày",
        "Train được 4 new hire về objection handling"
      ]
    },
    interviewAnswer: {
      question: 1,
      style: "concrete",
      text: "Em và marketing conflict về lead quality. Em đề xuất meeting hàng tuần: marketing show campaign plan, em show lead conversion data. Em phát hiện campaign X generate leads có convert rate 3x cao hơn. Marketing focus resource vào đó, cả hai đều win. Em setup shared dashboard để cả team track."
    }
  },
  {
    id: "biz_c12",
    name: "Phạm Đức Thắng",
    gpa: 2.70,
    internshipMonths: 15,
    projects: 3,
    skills: ["Field Sales", "Relationship Building", "Territory Expansion"],
    note: "Phát triển thị trường tỉnh cho công ty dược",
    quadrant: "Q3",
    outcome: "success",
    trialResult: {
      verdict: "Kết nối tốt",
      bullets: [
        "Mở rộng distribution từ 3 lên 15 tỉnh trong 1 năm",
        "Build relationship với 50+ pharmacy owner",
        "Revenue territory tăng 200% YoY"
      ]
    },
    interviewAnswer: {
      question: 3,
      style: "concrete",
      text: "Công ty chuyển sang bán online, em chưa biết e-commerce. Em dành 1 tuần học Shopee seller center, Lazada university, rồi đăng ký bán thử sản phẩm sample. Em học được cách optimize listing, chạy promotion. Tuần sau em propose hybrid model: online + offline cho territory. Director approve, revenue tăng thêm 40%."
    }
  },
  {
    id: "biz_c13",
    name: "Trần Quốc Long",
    gpa: 2.95,
    internshipMonths: 10,
    projects: 3,
    skills: ["Enterprise Sales", "Contract Negotiation", "Solution Selling"],
    note: "Đóng deal lớn nhất công ty năm ngoái",
    quadrant: "Q3",
    outcome: "success",
    trialResult: {
      verdict: "Deal closer",
      bullets: [
        "Close deal 5 tỷ với tập đoàn sản xuất sau 3 tháng跟进",
        "Negotiate multi-year contract với payment terms favorable",
        "Coordinate với legal, tech, finance để deliver giải pháp toàn diện"
      ]
    },
    interviewAnswer: {
      question: 1,
      style: "concrete",
      text: "Pre-sales engineer và em tranh solution cho client. Em đề xuất let client decide: present cả 2 solution, demo cả 2, cho client test 2 tuần. Client chọn solution B của pre-sales vì phù hợp budget hơn. Em accept và learn từ pre-sales. Sau đó em và pre-sales tạo standardized proposal template cho cả team."
    }
  },
  {
    id: "biz_c14",
    name: "Hoàng Văn Khoa",
    gpa: 2.80,
    internshipMonths: 8,
    projects: 2,
    skills: ["Sales", "Hunting", "Aggressive"],
    note: "Sale tốt nhưng hay nói xấu đồng nghiệp",
    quadrant: "Q3",
    outcome: "fail",
    trialResult: {
      verdict: "Burning bridges",
      bullets: [
        "Đạt KPI cá nhân nhưng hay steal leads từ đồng nghiệp",
        "Nói xấu sales khác trước mặt khách để mình win",
        "Team morale giảm sút khi làm việc cùng"
      ]
    },
    interviewAnswer: {
      question: 2,
      style: "shallow",
      text: "Em nghĩ trong sales quan trọng nhất là kết quả. Nếu deadline gấp thì phải làm mọi cách để close deal. Em không quan tâm quá nhiều đến quy trình nếu nó làm chậm tiến độ. Kết quả mới là thứ sếp quan tâm."
    }
  },

  // ── Q4: Low GPA + Low practice → 4 fail ──
  {
    id: "biz_c15",
    name: "Nguyễn Văn Tuấn",
    gpa: 2.50,
    internshipMonths: 0,
    projects: 0,
    skills: ["Basic Communication"],
    note: "Chưa từng làm sales",
    quadrant: "Q4",
    outcome: "fail",
    trialResult: {
      verdict: "Chưa đáp ứng",
      bullets: [
        "Rất ngại tiếp xúc với khách hàng",
        "Chưa biết basic sales process hay objection handling",
        "Thiếu động lực và sự tự tin"
      ]
    },
    interviewAnswer: {
      question: 1,
      style: "shallow",
      text: "Em sẽ cố gắng lắng nghe mọi người và giải quyết vấn đề một cách hòa bình. Em nghĩ quan trọng nhất là giữ mối quan hệ tốt với đồng nghiệp. Em chưa có nhiều kinh nghiệm nhưng rất sẵn sàng học hỏi."
    }
  },
  {
    id: "biz_c16",
    name: "Lê Thị Kim Chi",
    gpa: 2.60,
    internshipMonths: 1,
    projects: 0,
    skills: ["Customer Service basic"],
    note: "Làm PG 1 sự kiện, không liên quan",
    quadrant: "Q4",
    outcome: "fail",
    trialResult: {
      verdict: "Cải thiện nhiều",
      bullets: [
        "Giao tiếp thân thiện nhưng chưa có kỹ năng sales",
        "Không hiểu về product, không demo được",
        "Dễ bị khách hàng dắt mũi"
      ]
    },
    interviewAnswer: {
      question: 3,
      style: "shallow",
      text: "Em sẽ tự học qua Internet và các khóa học ngắn hạn. Em nghĩ sales là kỹ năng có thể học được nếu có nỗ lực. Em cũng thường xem các video về kỹ năng giao tiếp trên YouTube để cải thiện bản thân."
    }
  },
  {
    id: "biz_c17",
    name: "Phan Quốc Bảo",
    gpa: 2.35,
    internshipMonths: 0,
    projects: 0,
    skills: ["Basic"],
    note: "Không có kinh nghiệm và không có định hướng",
    quadrant: "Q4",
    outcome: "fail",
    trialResult: {
      verdict: "Không phù hợp",
      bullets: [
        "Không có kỹ năng giao tiếp và thuyết phục",
        "Không có kiến thức về thị trường hay sản phẩm",
        "Thiếu đam mê với nghề sales"
      ]
    },
    interviewAnswer: {
      question: 2,
      style: "shallow",
      text: "Em sẽ cố gắng hết sức mình. Nếu gặp khó khăn em sẽ nhờ đồng nghiệp giúp đỡ. Em nghĩ nỗ lực và chăm chỉ sẽ giúp em vượt qua mọi thử thách trong công việc."
    }
  },
  {
    id: "biz_c18",
    name: "Đinh Thị Hằng Nga",
    gpa: 2.55,
    internshipMonths: 1,
    projects: 0,
    skills: ["Office basic"],
    note: "Chuyển ngành từ sư phạm sang kinh doanh",
    quadrant: "Q4",
    outcome: "fail",
    trialResult: {
      verdict: "Cần học thêm",
      bullets: [
        "Thiếu kiến thức kinh doanh cơ bản",
        "Giao tiếp tốt nhưng không biết cách chốt sale",
        "Cần thời gian dài để đào tạo"
      ]
    },
    interviewAnswer: {
      question: 3,
      style: "shallow",
      text: "Em biết mình mới chuyển ngành nên cần cố gắng nhiều hơn. Em sẽ đăng ký các khóa học về sales và marketing. Em tin rằng với kinh nghiệm dạy học, em có thể truyền đạt tốt về sản phẩm cho khách hàng."
    }
  },

  // ── Wildcards ──
  {
    id: "biz_c19",
    name: "Mai Quang Duy",
    gpa: 3.20,
    internshipMonths: 0,
    projects: 5,
    skills: ["Self-taught", "Entrepreneur", "Online Business"],
    note: "Tự kinh doanh online doanh thu 500tr/năm",
    quadrant: "WILD",
    outcome: "success",
    trialResult: {
      verdict: "Doanh nhân tự học",
      bullets: [
        "Xây dựng 3 kênh bán hàng online tổng revenue 500tr/năm",
        "Tự học Facebook Ads, Shopee SEO, TikTok Shop từ zero",
        "Hiểu toàn bộ customer journey vì trải nghiệm thực tế"
      ]
    },
    interviewAnswer: {
      question: 3,
      style: "concrete",
      text: "Em tự build business online từ zero: đầu tiên study 50 shop thành công nhất trên Shopee, phân tích pricing strategy và listing format. Em apply với sản phẩm của mình, optimize dần qua 30 ngày: thay đổi title keyword, main image, và bundle deal. Tháng thứ 3 đạt GMV 100tr. Em scale lên 3 sản phẩm và đạt 500tr/năm."
    }
  },
  {
    id: "biz_c20",
    name: "Bùi Thị Thảo Nguyên",
    gpa: 3.50,
    internshipMonths: 8,
    projects: 3,
    skills: ["Sales", "Smart", "High Performer"],
    note: "Sale giỏi nhưng burning bridges với mọi công ty",
    quadrant: "WILD",
    outcome: "fail",
    trialResult: {
      verdict: "Toxic performer",
      bullets: [
        "Kỹ năng sales rất tốt nhưng từng bị 3 công ty cho nghỉ vì thái độ",
        "Hay tranh công với đồng nghiệp và tạo conflict không cần thiết",
        "Badmouth ex-employer trong phỏng vấn"
      ]
    },
    interviewAnswer: {
      question: 1,
      style: "shallow",
      text: "Em nghĩ nếu performance tốt thì những thứ khác không quan trọng. Em không thích lãng phí thời gian cho politics công sở. Nếu team không theo kịp em thì đó là vấn đề của team. Em đến đây để đóng deal, không phải để làm bạn."
    }
  }
];
