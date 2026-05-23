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
        "Xây pipeline CRM chuẩn, tỷ lệ follow-up đạt 100%",
        "Đàm phán giảm giá từ 30% xuống chỉ 15% cho khách hàng lớn"
      ]
    },
    interviewAnswer: {
      question: 1,
      style: "concrete",
      text: "Em và sales lead tranh nhau khu vực khách hàng. Em đề xuất chia theo ngành dọc thay vì theo địa lý, vì em phân tích dữ liệu CRM thấy có trùng lặp 40%. Lead đồng ý sau khi em trình bày dashboard. Kết quả: cả hai đều tăng 20% pipeline vì không còn cạnh tranh nhau."
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
        "Duy trì 95% retention rate cho các account hiện tại",
        "Upsell thành công cho 3 khách hàng từ gói cơ bản sang premium",
        "Trình bày đề xuất cho ban giám đốc thành công"
      ]
    },
    interviewAnswer: {
      question: 2,
      style: "concrete",
      text: "Khách hàng muốn giảm giá 25% cho hợp đồng 1 tỷ mà em chỉ được quyền duyệt 15%. Em xin họp với quản lý, đề xuất đổi lại: giảm 10% giá + tặng 3 tháng hỗ trợ + đào tạo cho nhân viên. Khách hàng đồng ý vì tổng giá trị cao hơn. Em ghi chép cấu trúc deal để team tái sử dụng cho các trường hợp tương tự."
    }
  },
  {
    id: "biz_c03",
    name: "Lê Hoàng Nam",
    gpa: 2.44,
    internshipMonths: 0,
    projects: 0,
    skills: ["Lý thuyết kinh doanh", "PowerPoint"],
    note: "Học nhiều lý thuyết, chưa có trải nghiệm kinh doanh thực tế",
    quadrant: "Q4",
    outcome: "fail",
    trialResult: {
      verdict: "Lý thuyết nhiều, thực tế ít",
      bullets: [
        "Phân tích SWOT đúng mẫu nhưng không áp dụng được vào bối cảnh cụ thể",
        "Không biết cách làm việc với khách hàng thực tế",
        "Kế hoạch kinh doanh thiếu thực tiễn, nhiều ý chung chung"
      ]
    },
    interviewAnswer: {
      question: 3,
      style: "shallow",
      text: "Khi công ty áp dụng SPIN selling, em chưa biết mô hình này. Em đọc sách của Neil Rackham trong 3 ngày, xác định 5 câu hỏi tình huống + 3 câu hỏi vấn đề cho sản phẩm của mình. Tuần sau áp dụng vào pitch cho khách B2B, ký kết deal 500 triệu. Em chia sẻ kịch bản với cả team sales."
    }
  },
  {
    id: "biz_c04",
    name: "Phạm Thị Ngọc Anh",
    gpa: 2.62,
    internshipMonths: 1,
    projects: 0,
    skills: ["Giao tiếp", "Office"],
    note: "Thực tập hành chính 1 tháng, chưa có kinh nghiệm business thực",
    quadrant: "Q4",
    outcome: "fail",
    trialResult: {
      verdict: "Chưa phù hợp vị trí",
      bullets: [
        "Giao tiếp ổn nhưng không có kiến thức chuyên môn business cụ thể",
        "Không biết phân tích số liệu hay làm financial model",
        "Chưa có case study thực tế nào để tham chiếu"
      ]
    },
    interviewAnswer: {
      question: 2,
      style: "shallow",
      text: "Marketing chạy khuyến mãi mà sales không được báo trước, khách đến hỏi em không biết. Em lập tức gọi marketing, yêu cầu gửi chi tiết khuyến mãi trong group Zalo chung. Em cũng đề xuất tạo quy trình chuẩn: marketing gửi bản tóm tắt khuyến mãi 48h trước phát động cho sales. Sau đó không còn bị bất ngờ nữa."
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
    note: "Giỏi giải case nhưng chưa ký kết deal nào",
    quadrant: "Q2",
    outcome: "fail",
    trialResult: {
      verdict: "Thiếu thực chiến",
      bullets: [
        "Phân tích case rất tốt nhưng không biết tiếp cận khách hàng thật",
        "Chưa có kinh nghiệm cold calling hay negotiation",
        "Mất bình tĩnh khi bị khách hàng từ chối"
      ]
    },
    interviewAnswer: {
      question: 3,
      style: "shallow",
      text: "Em thường đọc sách về kinh doanh và chiến lược. Em nghĩ kiến thức nền tảng rất quan trọng để làm sales. Em cũng hay tham gia các cuộc thi giải case để rèn luyện tư duy phân tích."
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
        "Báo cáo chi tiết nhưng không có đề xuất khả thi",
        "Không tự tin khi nói chuyện trực tiếp với khách hàng",
        "Mất quá nhiều thời gian phân tích mà quên thực thi"
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
        "Nói chuyện rất hay nhưng không chuyển đổi được thành sale",
        "Chưa biết xử lý phản đối khi khách hàng chê giá",
        "Thiếu kỹ năng thực tế như viết đề xuất hay hợp đồng"
      ]
    },
    interviewAnswer: {
      question: 1,
      style: "shallow",
      text: "Em nghĩ trưởng nhóm cần lắng nghe nhân viên và đưa ra quyết định công bằng. Xung đột là cơ hội để cải thiện quy trình. Em luôn cố gắng giữ thái độ tích cực và khuyến khích mọi người cùng phát triển."
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
        "Phù hợp làm nghiên cứu hơn sales"
      ]
    },
    interviewAnswer: {
      question: 2,
      style: "shallow",
      text: "Em sẽ chuẩn bị kỹ trước khi gặp khách hàng. Em nghĩ cần nghiên cứu thật kỹ về khách hàng và sản phẩm để tự tin hơn. Em sẽ nỗ lực cải thiện kỹ năng giao tiếp của mình."
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
        "Học kiến thức sản phẩm trong 2 ngày, demo cho khách hàng ngay",
        "Áp dụng mô hình bán hàng tư vấn sau 1 tuần quan sát senior",
        "Ký kết deal đầu tiên trị giá 300 triệu trong tháng đầu thử việc"
      ]
    },
    interviewAnswer: {
      question: 1,
      style: "concrete",
      text: "Em mới vào team, bị senior tranh khu vực. Em đề xuất mình phụ trách phân khúc SME còn senior phụ trách enterprise. Em chứng minh khả năng bằng cách nghiên cứu 50 SME trong khu vực, đánh giá 15 khách hàng tiềm năng, ký kết 3 deal trong 2 tuần. Senior ấn tượng và tự nguyện chia sẻ enterprise leads cho em."
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
    note: "Nhân viên xuất sắc 1.5 năm tại công ty B2B",
    quadrant: "Q3",
    outcome: "success",
    trialResult: {
      verdict: "Sinh ra để bán",
      bullets: [
        "Đạt 150% quota trong quý đầu tiên thử việc",
        "Xây dựng pipeline 2 tỷ từ cold calling 200 số/ngày",
        "Tỷ lệ chuyển đổi 12% (trung bình ngành: 5%)"
      ]
    },
    interviewAnswer: {
      question: 2,
      style: "concrete",
      text: "Deadline close quarter, 3 deal pending. Em xếp theo xác suất: deal A 80%, B 50%, C 30%. Em tập trung 70% thời gian cho A, đàm phán điều khoản thanh toán trực tiếp với CFO khách hàng. Deal close. Đối B, em tạo sự cấp bách bằng ưu đãi có thời hạn. Deal close. Deal C em đẩy sang quarter sau nhưng chốt cam kết. Kết quả: vượt target 20%."
    }
  },
  {
    id: "biz_c11",
    name: "Lê Thị Trâm",
    gpa: 3.05,
    internshipMonths: 12,
    projects: 4,
    skills: ["Inside Sales", "Cold Calling", "CRM HubSpot"],
    note: "Sales part-time 3 học kỳ cuối",
    quadrant: "Q3",
    outcome: "success",
    trialResult: {
      verdict: "Kiên trì hiệu quả",
      bullets: [
        "Thực hiện 500+ calls/tháng, liên tục đạt target",
        "Giảm chu kỳ sales trung bình từ 45 ngày xuống 28 ngày",
        "Đào tạo được 4 nhân viên mới về xử lý phản đối"
      ]
    },
    interviewAnswer: {
      question: 1,
      style: "concrete",
      text: "Em và marketing xung đột về chất lượng lead. Em đề xuất họp hàng tuần: marketing trình bày kế hoạch chiến dịch, em trình bày dữ liệu chuyển đổi lead. Em phát hiện chiến dịch X tạo ra leads có tỷ lệ chuyển đổi 3x cao hơn. Marketing tập trung nguồn lực vào đó, cả hai đều thắng. Em thiết lập dashboard chung để cả team theo dõi."
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
        "Xây dựng mối quan hệ với 50+ chủ nhà thuốc",
        "Revenue khu vực tăng 200% YoY"
      ]
    },
    interviewAnswer: {
      question: 3,
      style: "concrete",
      text: "Công ty chuyển sang bán online, em chưa biết thương mại điện tử. Em dành 1 tuần học trung tâm người bán Shopee, Lazada university, rồi đăng ký bán thử sản phẩm mẫu. Em học được cách tối ưu hóa danh mục, chạy khuyến mãi. Tuần sau em đề xuất mô hình kết hợp: online + offline cho khu vực. Giám đốc phê duyệt, revenue tăng thêm 40%."
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
        "Ký kết deal 5 tỷ với tập đoàn sản xuất sau 3 tháng theo sát",
        "Đàm phán hợp đồng nhiều năm với điều khoản thanh toán có lợi",
        "Phối hợp với legal, tech, finance để cung cấp giải pháp toàn diện"
      ]
    },
    interviewAnswer: {
      question: 1,
      style: "concrete",
      text: "Pre-sales engineer và em tranh giải pháp cho khách hàng. Em đề xuất để khách hàng quyết định: trình bày cả 2 giải pháp, demo cả 2, cho khách hàng dùng thử 2 tuần. Khách hàng chọn giải pháp B của pre-sales vì phù hợp ngân sách hơn. Em chấp nhận và học hỏi từ pre-sales. Sau đó em và pre-sales tạo biểu mẫu đề xuất tiêu chuẩn cho cả team."
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
        "Đạt KPI cá nhân nhưng hay chôm leads từ đồng nghiệp",
        "Nói xấu sales khác trước mặt khách để mình win",
        "Team morale giảm sút khi làm việc cùng"
      ]
    },
    interviewAnswer: {
      question: 2,
      style: "shallow",
      text: "Em nghĩ trong sales quan trọng nhất là kết quả. Nếu deadline gấp thì phải làm mọi cách để ký kết deal. Em không quan tâm quá nhiều đến quy trình nếu nó làm chậm tiến độ. Kết quả mới là thứ sếp quan tâm."
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
        "Chưa biết quy trình sales cơ bản hay xử lý phản đối",
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
        "Không hiểu về sản phẩm, không demo được",
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
      text: "Em tự xây dựng kinh doanh online từ con số 0: đầu tiên nghiên cứu 50 shop thành công nhất trên Shopee, phân tích chiến lược định giá và định dạng danh mục. Em áp dụng với sản phẩm của mình, tối ưu hóa dần qua 30 ngày: thay đổi từ khóa tiêu đề, hình ảnh chính, và gói combo. Tháng thứ 3 đạt GMV 100tr. Em mở rộng lên 3 sản phẩm và đạt 500tr/năm."
    }
  },
  {
    id: "biz_c20",
    name: "Bùi Thị Thảo Nguyên",
    gpa: 3.50,
    internshipMonths: 8,
    projects: 3,
    skills: ["Sales", "Smart", "High Performer"],
    note: "Sale giỏi nhưng đốt cầu nối với mọi công ty",
    quadrant: "WILD",
    outcome: "fail",
    trialResult: {
      verdict: "Toxic performer",
      bullets: [
        "Kỹ năng sales rất tốt nhưng từng bị 3 công ty cho nghỉ vì thái độ",
        "Hay tranh công với đồng nghiệp và tạo xung đột không cần thiết",
        "Nói xấu công ty cũ trong phỏng vấn"
      ]
    },
    interviewAnswer: {
      question: 1,
      style: "shallow",
      text: "Em nghĩ nếu hiệu suất tốt thì những thứ khác không quan trọng. Em không thích lãng phí thời gian cho chính trị công sở. Nếu team không theo kịp em thì đó là vấn đề của team. Em đến đây để đóng deal, không phải để làm bạn."
    }
  }
];
