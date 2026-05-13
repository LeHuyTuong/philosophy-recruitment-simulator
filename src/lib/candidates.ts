// HireMe Simulator — Candidate Seed Data
// 6 industries × 20 candidates = 120 total
// Quadrant structure per industry:
//   Q1: High GPA + High practice  → 4 success
//   Q2: High GPA + Low practice   → 4 fail + 1 wildcard success
//   Q3: Low GPA + High practice   → 4 success + 1 wildcard fail
//   Q4: Low GPA + Low practice    → 4 fail
//   Wild: 2 extra (self-taught success + bright-but-arrogant fail)

// ──────────────────────────────────────────────
// Types
// ──────────────────────────────────────────────

export interface Candidate {
  id: string;
  name: string;
  gpa: number;
  internshipMonths: number;
  projects: number;
  skills: string[];
  note: string;
  quadrant: "Q1" | "Q2" | "Q3" | "Q4" | "WILD";
  outcome: "success" | "fail";
  trialResult: {
    verdict: string;
    bullets: string[];
  };
  interviewAnswer: {
    question: 1 | 2 | 3;
    style: "concrete" | "shallow";
    text: string;
  };
}

export type Industry = "it" | "marketing" | "accounting" | "business" | "design" | "education";

// ──────────────────────────────────────────────
// Interview Questions (shared reference)
// ──────────────────────────────────────────────
// Q1: "Bạn xử lý xung đột trong team thế nào?"
// Q2: "Deadline gấp + vấn đề khó, bạn làm gì?"
// Q3: "Bạn học và áp dụng cái mới ra sao?"

// ══════════════════════════════════════════════
// INDUSTRY 1 — IT
// ══════════════════════════════════════════════

const itCandidates: Candidate[] = [
  // ── Q1: High GPA + High practice → 4 success ──
  {
    id: "it_c01",
    name: "Nguyễn Minh An",
    gpa: 3.85,
    internshipMonths: 8,
    projects: 3,
    skills: ["React", "Node", "Teamwork"],
    note: "Học bổng + thực tập từ năm 3",
    quadrant: "Q1",
    outcome: "success",
    trialResult: {
      verdict: "Vượt kỳ vọng",
      bullets: [
        "Hoàn thành task React+Node đúng deadline, code clean, có viết test",
        "Proactively refactor lại module cũ giảm 30% response time",
        "Hợp tác tốt với team, chịu nhận task khó khi teammate ốm"
      ]
    },
    interviewAnswer: {
      question: 1,
      style: "concrete",
      text: "Lần đó 2 bạn frontend tranh nhau kiến trúc component, em đứng ra đề nghị họ vẽ各自 prototype rồi cả team vote. Em dùng Confluence ghi lại quyết định để sau không ai cãi lại. Kết quả cả hai đều OK với hướng đi chung."
    }
  },
  {
    id: "it_c02",
    name: "Lê Hoàng Anh",
    gpa: 3.70,
    internshipMonths: 6,
    projects: 2,
    skills: ["Python", "ML", "Communication"],
    note: "Vừa học vừa freelance",
    quadrant: "Q1",
    outcome: "success",
    trialResult: {
      verdict: "Hoàn thành tốt",
      bullets: [
        "Xây model classify text đạt accuracy 87% trong 2 tuần",
        "Document rõ ràng notebook Jupyter cho team dễ follow",
        "Trình bày kết quả rõ ràng cho non-tech stakeholder"
      ]
    },
    interviewAnswer: {
      question: 2,
      style: "concrete",
      text: "Tích đó deadline sprint thứ 3, model bị overfit. Em quyết định dùng early stopping và tăng regularization, vừa tối ưu vừa chạy cross-validation song song trên Colab Pro. Cuối cùng submit đúng giờ, model đạt F1 0.82 thay vì 0.68 ban đầu."
    }
  },
  {
    id: "it_c03",
    name: "Trần Thu Hà",
    gpa: 3.92,
    internshipMonths: 10,
    projects: 4,
    skills: ["Java", "Spring", "Leadership"],
    note: "Leader CLB lập trình",
    quadrant: "Q1",
    outcome: "success",
    trialResult: {
      verdict: "Xuất sắc",
      bullets: [
        "Design RESTful API chuẩn, code review nghiêm cho intern khác",
        "Tối ưu query database giảm latency từ 800ms xuống 120ms",
        "Đề xuất workflow CI/CD giúp team deploy nhanh hơn 40%"
      ]
    },
    interviewAnswer: {
      question: 3,
      style: "concrete",
      text: "Em tự học Spring WebFlux qua video Baeldung rồi áp dụng ngay vào project chat real-time của CLB. Đầu tiên code lỗi nhiều, nhưng em debug từng bài rồi blog lại урок learnt trên Medium. Sau đó hướng dẫn 3 bạn junior khác cùng dùng reactive programming."
    }
  },
  {
    id: "it_c04",
    name: "Phạm Đức Long",
    gpa: 3.65,
    internshipMonths: 7,
    projects: 3,
    skills: ["UI/UX", "Figma", "Frontend"],
    note: "Có portfolio cá nhân",
    quadrant: "Q1",
    outcome: "success",
    trialResult: {
      verdict: "Hoàn thành tốt",
      bullets: [
        "Giao diện responsive pixel-perfect theo design Figma",
        "Tối ưu accessibility đạt Lighthouse score 95+",
        "Làm việc tốt với designer, đề xuất改进 UX flow"
      ]
    },
    interviewAnswer: {
      question: 1,
      style: "concrete",
      text: "Designer muốn animation phức tạp nhưng deadline gấp. Em đề xuất dùng Framer Motion với preset animation thay vì custom keyframe, đồng thời tạo component reuse cho cả project. Cả hai đều hài lòng vì giao diện đẹp hơn dự kiến mà vẫn kịp deadline."
    }
  },

  // ── Q2: High GPA + Low practice → 4 fail + 1 wildcard success ──
  {
    id: "it_c05",
    name: "Vũ Quốc Bảo",
    gpa: 3.95,
    internshipMonths: 0,
    projects: 0,
    skills: ["Theory", "Math"],
    note: "Học bổng 6 kỳ, chưa đi thực tập",
    quadrant: "Q2",
    outcome: "fail",
    trialResult: {
      verdict: "Chưa đáp ứng",
      bullets: [
        "Code chạy được nhưng không tuân convention của team",
        "Mất nhiều thời gian setup môi trường, cần hướng dẫn liên tục",
        "Khó giao việc vì chưa biết cách chia task trong thực tế"
      ]
    },
    interviewAnswer: {
      question: 2,
      style: "shallow",
      text: "Em sẽ phân tích vấn đề thành các phần nhỏ rồi giải quyết từng cái một. Em nghĩ planning là rất quan trọng nên sẽ dành thời gian thiết kế giải pháp trước khi code. Em luôn cố gắng hoàn thành đúng deadline."
    }
  },
  {
    id: "it_c06",
    name: "Đỗ Khánh Linh",
    gpa: 3.80,
    internshipMonths: 0,
    projects: 1,
    skills: ["Algorithms", "DSA"],
    note: "Top 5 khoa",
    quadrant: "Q2",
    outcome: "fail",
    trialResult: {
      verdict: "Chưa phù hợp",
      bullets: [
        "Giỏi giải thuật nhưng code production còn yếu",
        "Chưa biết dùng Git branch, conflict nhiều lần",
        "Phản hồi chậm khi có bug trong sprint"
      ]
    },
    interviewAnswer: {
      question: 3,
      style: "shallow",
      text: "Em thường đọc sách và xem video để học thêm kiến thức mới. Em think rằng việc tự học là rất quan trọng trong ngành IT vì công nghệ thay đổi liên tục. Em luôn cố gắng cập nhật kiến thức mỗi ngày."
    }
  },
  {
    id: "it_c07",
    name: "Hoàng Mai Phương",
    gpa: 3.88,
    internshipMonths: 1,
    projects: 0,
    skills: ["Database", "SQL"],
    note: "Thực tập 1 tháng rồi nghỉ",
    quadrant: "Q2",
    outcome: "fail",
    trialResult: {
      verdict: "Cần cải thiện",
      bullets: [
        "Hiểu về database nhưng chưa viết stored procedure thực tế",
        "Thiếu kỹ năng làm việc nhóm, thích làm một mình",
        "Chưa có kinh nghiệm optimize query cho data lớn"
      ]
    },
    interviewAnswer: {
      question: 1,
      style: "shallow",
      text: "Em nghĩ khi có xung đột thì nên nói chuyện thẳng thắn để giải quyết. Mọi người nên lắng nghe nhau nhiều hơn và tìm ra giải pháp chung. Em là người hòa bình nên thường nhường nhịn."
    }
  },
  {
    id: "it_c08",
    name: "Bùi Thanh Tùng",
    gpa: 3.75,
    internshipMonths: 0,
    projects: 1,
    skills: ["C++", "OS"],
    note: "Tập trung học, ngại va chạm",
    quadrant: "Q2",
    outcome: "fail",
    trialResult: {
      verdict: "Chưa đáp ứng",
      bullets: [
        "Hiểu sâu về OS nhưng không apply được vào project web",
        "Giao tiếp mờ nhạt, khó hiểu ý trong daily standup",
        "Từ chối nhận task không nằm trong comfort zone"
      ]
    },
    interviewAnswer: {
      question: 2,
      style: "shallow",
      text: "Em sẽ lên kế hoạch chi tiết và làm theo từng bước. Nếu gặp khó khăn em sẽ tìm kiếm tài liệu trên mạng hoặc hỏi người có kinh nghiệm. Em tin rằng với nỗ lực mọi vấn đề đều có thể giải quyết được."
    }
  },
  {
    id: "it_c09",
    name: "Ngô Hải Nam",
    gpa: 3.90,
    internshipMonths: 2,
    projects: 1,
    skills: ["AI", "TensorFlow"],
    note: "Giỏi lý thuyết, học nhanh khi gặp việc thật",
    quadrant: "Q2",
    outcome: "success",
    trialResult: {
      verdict: "Học hỏi nhanh",
      bullets: [
        "Học React trong 3 ngày và deliver được task frontend",
        "Apply kiến thức math vào tối ưu thuật toán recommendation",
        "Đặt câu hỏi thông minh, không lặp lại lỗi"
      ]
    },
    interviewAnswer: {
      question: 3,
      style: "concrete",
      text: "Em được giao task machine learning nhưng chưa biết PyTorch. Em đọc docs 2 buổi tối, làm theo tutorial MNIST rồi adapt vào data thật của công ty. Tuần sau đã train được model đạt yêu cầu. Em note lại bước đi trong Notion để team khác reference."
    }
  },

  // ── Q3: Low GPA + High practice → 4 success + 1 wildcard fail ──
  {
    id: "it_c10",
    name: "Lý Văn Cường",
    gpa: 2.85,
    internshipMonths: 12,
    projects: 5,
    skills: ["Backend", "DevOps", "Docker"],
    note: "Bỏ học 1 kỳ để đi làm",
    quadrant: "Q3",
    outcome: "success",
    trialResult: {
      verdict: "Kinh nghiệm thực",
      bullets: [
        "Setup CI/CD pipeline hoàn chỉnh trong tuần đầu tiên",
        "Tối ưu Docker image giảm build time từ 15 phút xuống 3 phút",
        "Hỗ trợ deploy cho 3 team đồng thời, quản lý 20+ containers"
      ]
    },
    interviewAnswer: {
      question: 2,
      style: "concrete",
      text: "Sprint trước server bị sập lúc 2h sáng do memory leak. Em SSH vào check log, phát hiện connection pool không release, quick fix bằng cách restart service rồi thêm connection pooling config. Sáng hôm sau em viết proper fix với health check và alert monitoring qua Prometheus."
    }
  },
  {
    id: "it_c11",
    name: "Trịnh Thu Trang",
    gpa: 3.00,
    internshipMonths: 9,
    projects: 4,
    skills: ["Mobile", "React Native", "Teamwork"],
    note: "Part-time 2 công ty",
    quadrant: "Q3",
    outcome: "success",
    trialResult: {
      verdict: "Hoàn thành tốt",
      bullets: [
        "Build 3 screen mobile đúng spec, handle edge case tốt",
        "Đề xuất dùng React Query thay vì Redux cho API state",
        "Hỗ trợ tester write test case cho tính năng mới"
      ]
    },
    interviewAnswer: {
      question: 1,
      style: "concrete",
      text: "Em và 1 bạn dev tranh nhau cách handle navigation. Em đề nghị cả hai cùng code prototype mỗi cách 1 ngày rồi benchmark performance bằng Flipper. Kết quả cách của em nhanh hơn 200ms, bạn kia đồng ý luôn vì có số liệu rõ ràng. Sau đó em viết wiki cho cả team."
    }
  },
  {
    id: "it_c12",
    name: "Đinh Văn Hùng",
    gpa: 2.70,
    internshipMonths: 10,
    projects: 3,
    skills: ["Fullstack", "Communication"],
    note: "Công ty cũ muốn giữ lại",
    quadrant: "Q3",
    outcome: "success",
    trialResult: {
      verdict: "Vượt kỳ vọng",
      bullets: [
        "Fullstack deliver cả backend API và admin dashboard",
        "Dịch business requirement thành technical spec rất tốt",
        "Đào tạo được 2 intern mới trong thời gian thử việc"
      ]
    },
    interviewAnswer: {
      question: 3,
      style: "concrete",
      text: "Công ty chuyển từ REST sang GraphQL, em chưa biết. Em dành 3 tối học Apollo Client/Server qua course trên Udemy, rồi refactor 1 API endpoint trong project thật để chứng minh. Sau khi team thấy benefit, em được giao migrate toàn bộ hệ thống trong 2 sprint."
    }
  },
  {
    id: "it_c13",
    name: "Mai Thị Yến",
    gpa: 2.95,
    internshipMonths: 8,
    projects: 3,
    skills: ["QA", "Automation Test"],
    note: "Có ISTQB",
    quadrant: "Q3",
    outcome: "success",
    trialResult: {
      verdict: "Chuyên môn chắc",
      bullets: [
        "Viết 150+ test case cover 95% critical flows",
        "Setup Cypress E2E pipeline chạy parallel 3 browser",
        "Tìm được 12 bug regression mà dev không phát hiện"
      ]
    },
    interviewAnswer: {
      question: 1,
      style: "concrete",
      text: "Lần đó dev không đồng ý bug em report, nói 'expected behavior'. Em quay video reproduce bug, thêm screenshot log, và so sánh với requirement document. Dev xem lại rồi承认 là bug thật. Từ đó em tạo template bug report chuẩn cho cả team QA dùng."
    }
  },
  {
    id: "it_c14",
    name: "Tô Minh Khoa",
    gpa: 2.80,
    internshipMonths: 6,
    projects: 2,
    skills: ["Data Analyst", "SQL"],
    note: "Skill ổn nhưng thái độ tiêu cực ở job cũ",
    quadrant: "Q3",
    outcome: "fail",
    trialResult: {
      verdict: "Thái độ vấn đề",
      bullets: [
        "Kỹ năng phân tích data khá nhưng hay phàn nàn về task",
        "Từ chối làm task ngoài phạm vi 'data analyst'",
        "Gây tension trong team khi review code của người khác"
      ]
    },
    interviewAnswer: {
      question: 2,
      style: "shallow",
      text: "Em nghĩ deadline gấp thì phải tập trung làm thôi. Nếu khó quá thì nên nói với leader để điều chỉnh. Em không thích bị ép deadline không hợp lý. Mọi người nên giao task rõ ràng từ đầu thì mới không có chuyện đốt cháy giai đoạn."
    }
  },

  // ── Q4: Low GPA + Low practice → 4 fail ──
  {
    id: "it_c15",
    name: "Nguyễn Văn Khải",
    gpa: 2.50,
    internshipMonths: 0,
    projects: 0,
    skills: ["Basic HTML"],
    note: "Chưa có gì nổi bật",
    quadrant: "Q4",
    outcome: "fail",
    trialResult: {
      verdict: "Chưa đáp ứng",
      bullets: [
        "Code HTML/CSS cơ bản, chưa biết JavaScript framework",
        "Cần hướng dẫn từng bước, không tự tìm hiểu được",
        "Thiếu kiến thức nền tảng lập trình"
      ]
    },
    interviewAnswer: {
      question: 1,
      style: "shallow",
      text: "Em sẽ cố gắng lắng nghe ý kiến mọi người rồi tìm cách giải quyết. Em nghĩ quan trọng nhất là giữ hòa khí trong team. Nếu có mâu thuẫn em sẽ nhờ leader phân xử."
    }
  },
  {
    id: "it_c16",
    name: "Phan Thị Hồng",
    gpa: 2.65,
    internshipMonths: 1,
    projects: 0,
    skills: ["Office"],
    note: "Thực tập ngắn ngày",
    quadrant: "Q4",
    outcome: "fail",
    trialResult: {
      verdict: "Cần cải thiện",
      bullets: [
        "Chỉ biết dùng Excel và Word, không có kinh nghiệm lập trình",
        "Thực tập 1 tháng ở vị trí admin, không liên quan tech",
        "Chưa có direction rõ ràng về con đường career"
      ]
    },
    interviewAnswer: {
      question: 3,
      style: "shallow",
      text: "Em sẽ học qua Internet và các khóa học online. Em thấy tự học là cách tốt nhất để phát triển. Em cũng thường xuyên hỏi bạn bè và thầy cô khi gặp khó khăn trong học tập."
    }
  },
  {
    id: "it_c17",
    name: "Trương Đức Anh",
    gpa: 2.40,
    internshipMonths: 0,
    projects: 0,
    skills: ["Gaming"],
    note: "GPA thấp, chưa va chạm",
    quadrant: "Q4",
    outcome: "fail",
    trialResult: {
      verdict: "Không phù hợp",
      bullets: [
        "Không có skill lập trình cơ bản",
        "Portfolio trống, không có project nào",
        "Thiếu động lực và định hướng trong ngành IT"
      ]
    },
    interviewAnswer: {
      question: 2,
      style: "shallow",
      text: "Em sẽ cố gắng hết sức để hoàn thành công việc. Nếu quá khó em sẽ nhờ mọi người giúp đỡ. Em nghĩ quan trọng nhất là không bỏ cuộc và luôn nỗ lực đến cùng."
    }
  },
  {
    id: "it_c18",
    name: "Lương Thị Vy",
    gpa: 2.55,
    internshipMonths: 2,
    projects: 1,
    skills: ["Photoshop"],
    note: "Chuyển ngành giữa chừng",
    quadrant: "Q4",
    outcome: "fail",
    trialResult: {
      verdict: "Cần học thêm",
      bullets: [
        "Biết Photoshop nhưng không có kỹ năng coding",
        "Project duy nhất là thiết kế banner cho CLB",
        "Cần nhiều thời gian training mới có thể làm việc"
      ]
    },
    interviewAnswer: {
      question: 3,
      style: "shallow",
      text: "Em thường tự tìm hiểu qua YouTube và Google. Em think rằng trong thời đại này ai cũng có thể tự học được nếu có ý chí. Em đang cố gắng học thêm lập trình cơ bản qua các course miễn phí."
    }
  },

  // ── Wildcards ──
  {
    id: "it_c19",
    name: "Cao Quang Huy",
    gpa: 3.20,
    internshipMonths: 0,
    projects: 4,
    skills: ["Self-taught", "Open Source"],
    note: "Không thực tập nhưng có 4 dự án open-source",
    quadrant: "WILD",
    outcome: "success",
    trialResult: {
      verdict: "Tiềm năng cao",
      bullets: [
        "Code clean, tuân thủ convention dù tự học",
        "Open-source project có 500+ stars trên GitHub",
        "Đọc docs nhanh, tự setup dev environment không cần support"
      ]
    },
    interviewAnswer: {
      question: 3,
      style: "concrete",
      text: "Em tự học Rust qua 'The Rust Book' rồi viết CLI tool manage task cho cá nhân. Khi thấy полезно em open-source lên GitHub. Có contributor từ 5 nước khác fork và contribute lại. Em học được code review skill từ community, nhiều hơn cả thực tập ở công ty nhỏ."
    }
  },
  {
    id: "it_c20",
    name: "Đặng Thu Hằng",
    gpa: 3.50,
    internshipMonths: 5,
    projects: 2,
    skills: ["Smart", "Skilled"],
    note: "Đủ chỉ số nhưng thái độ kiêu căng",
    quadrant: "WILD",
    outcome: "fail",
    trialResult: {
      verdict: "Thái độ vấn đề",
      bullets: [
        "Code giỏi nhưng tự quyết mà không thảo luận với team",
        "Phản hồi gay gắt khi code bị review",
        "Từ chối làm task 'quá đơn giản' với anh em junior"
      ]
    },
    interviewAnswer: {
      question: 1,
      style: "shallow",
      text: "Em nghĩ em đúng thì em sẽ giữ quan điểm. Nếu người khác không hiểu thì đó là vấn đề của họ. Em không thích compromise chất lượng code chỉ để làm hài lòng người khác. Team nên follow best practice chứ không phải consensus."
    }
  }
];

// ══════════════════════════════════════════════
// INDUSTRY 2 — MARKETING
// ══════════════════════════════════════════════

const marketingCandidates: Candidate[] = [
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

// ══════════════════════════════════════════════
// INDUSTRY 3 — ACCOUNTING
// ══════════════════════════════════════════════

const accountingCandidates: Candidate[] = [
  // ── Q1: High GPA + High practice → 4 success ──
  {
    id: "acc_c01",
    name: "Ngô Thị Thúy Vy",
    gpa: 3.90,
    internshipMonths: 8,
    projects: 3,
    skills: ["IFRS", "Excel Advanced", "ACCA F1-3"],
    note: "Thực tập Big4 (PwC), pass ACCA 3 môn",
    quadrant: "Q1",
    outcome: "success",
    trialResult: {
      verdict: "Chuyên môn vững",
      bullets: [
        "Lên sổ và reconcile tài khoản chính xác cho 3 client",
        "Sử dụng pivot table và VBA automation giảm 50% thời gian report",
        "Hiểu rõ IFRS 15, 16 và áp dụng đúng vào case thực tế"
      ]
    },
    interviewAnswer: {
      question: 1,
      style: "concrete",
      text: "Làm audit cho client sản xuất, senior và em bất đồng về treatment warranty expense. Em pull IFRS 15 document, so sánh với 3 case similar trong industry, rồi present cho manager. Manager agreed với em vì có tài liệu backup rõ ràng. Em học được luôn phải document mọi decision."
    }
  },
  {
    id: "acc_c02",
    name: "Phan Đức Anh",
    gpa: 3.75,
    internshipMonths: 7,
    projects: 2,
    skills: ["Audit", "Tax Compliance", "SAP"],
    note: "Intern tại Deloitte, biết dùng SAP",
    quadrant: "Q1",
    outcome: "success",
    trialResult: {
      verdict: "Làm việc chính xác",
      bullets: [
        "Hoàn thành kiểm tra chi tiết 500+ hóa đơn không có sai sót",
        "Tạo macro Excel tự động kiểm tra duplicated entries",
        "Làm việc độc lập sau 1 tuần training"
      ]
    },
    interviewAnswer: {
      question: 2,
      style: "concrete",
      text: "Deadline close sổ tháng 12, phát hiện discrepancy 200 triệu giữa GL và sub-ledger. Em không báo ngay mà tự investigate: filter theo date range, đối chiếu với bank statement, tìm ra 3 transaction bị double-post. Report cho manager kèm root cause analysis. Deadline vẫn kịp vì em OT đêm hôm đó."
    }
  },
  {
    id: "acc_c03",
    name: "Trịnh Minh Châu",
    gpa: 3.85,
    internshipMonths: 10,
    projects: 3,
    skills: ["Financial Analysis", "Excel Advanced", "Teamwork"],
    note: "Thực tập EY, đạt vị trí top intern",
    quadrant: "Q1",
    outcome: "success",
    trialResult: {
      verdict: "Vượt kỳ vọng",
      bullets: [
        "Phân tích variance cho 5 cost center, identify saving opportunity 15%",
        "Build financial model DCF cho project M&A client",
        "Train được 2 intern mới trong team"
      ]
    },
    interviewAnswer: {
      question: 3,
      style: "concrete",
      text: "Công ty chuyển sang chuẩn IFRS 17 cho bảo hiểm, em chưa biết. Em đăng ký course trên ACCA website, study 3 buổi tối, rồi practice trên dummy data. Sau đó em guide cả team 5 người qua transition, tạo mapping template từ VAS sang IFRS 17. Manager praise em vì proactive."
    }
  },
  {
    id: "acc_c04",
    name: "Lương Quốc Bảo",
    gpa: 3.68,
    internshipMonths: 6,
    projects: 2,
    skills: ["Tax", "Excel", "Communication"],
    note: "Intern KPMG tax department",
    quadrant: "Q1",
    outcome: "success",
    trialResult: {
      verdict: "Chính xác + nhanh",
      bullets: [
        "Khai báo thuế TNDN cho 4 công ty đúng deadline",
        "Tối ưu deductible expenses giúp client tiết kiệm 300 triệu",
        "Giao tiếp tốt với cơ quan thuế khi giải trình"
      ]
    },
    interviewAnswer: {
      question: 1,
      style: "concrete",
      text: "Senior muốn apply aggressive tax position mà em thấy rủi ro. Em research 3 precedents từ Thông tư và Circular, trình bày risk-reward cho manager. Manager agree chọn middle ground: apply position nhưng prepare defensive file sẵn. 6 tháng sau tax authority questioned, company có document sẵn nên không bị penalty."
    }
  },

  // ── Q2: High GPA + Low practice → 4 fail + 1 wildcard success ──
  {
    id: "acc_c05",
    name: "Hoàng Đức Minh",
    gpa: 3.95,
    internshipMonths: 0,
    projects: 0,
    skills: ["IFRS Theory", "Financial Reporting", "Accounting Standards"],
    note: "Top 1 khoa, chưa lên sổ thật",
    quadrant: "Q2",
    outcome: "fail",
    trialResult: {
      verdict: "Thiếu thực hành",
      bullets: [
        "Hiểu chuẩn mực kế toán nhưng chưa từng lên sổ",
        "Chưa biết dùng phần mềm kế toán (MISA, SAP)",
        "Xử lý case study nhanh nhưng chậm với dữ liệu thực tế"
      ]
    },
    interviewAnswer: {
      question: 2,
      style: "shallow",
      text: "Em sẽ lập kế hoạch làm việc chi tiết và ưu tiên công việc quan trọng nhất. Em nghĩ quản lý thời gian là kỹ năng quan trọng nhất. Em luôn cố gắng hoàn thành công việc đúng hạn và đạt chất lượng cao nhất."
    }
  },
  {
    id: "acc_c06",
    name: "Đỗ Thị Thanh Hà",
    gpa: 3.82,
    internshipMonths: 0,
    projects: 1,
    skills: ["Cost Accounting", "Budgeting Theory"],
    note: "Case study quốc tế đạt giải nhưng chưa làm thật",
    quadrant: "Q2",
    outcome: "fail",
    trialResult: {
      verdict: "Cần thực chiến",
      bullets: [
        "Phân tích chi phí lý thuyết tốt nhưng chưa handle real data",
        "Mất nhiều thời gian khi làm việc với data lộn xộn thực tế",
        "Chưa có kinh nghiệm làm việc với phòng ban khác"
      ]
    },
    interviewAnswer: {
      question: 3,
      style: "shallow",
      text: "Em thường đọc sách chuyên ngành và tham gia các khóa học online. Em nghĩ việc tự học là rất quan trọng trong ngành kế toán vì chuẩn mực thay đổi liên tục. Em luôn cập nhật kiến thức mới nhất từ các nguồn uy tín."
    }
  },
  {
    id: "acc_c07",
    name: "Mai Văn Kiên",
    gpa: 3.78,
    internshipMonths: 1,
    projects: 0,
    skills: ["Auditing Theory", "Internal Control"],
    note: "Thực tập 1 tháng xem người khác làm",
    quadrant: "Q2",
    outcome: "fail",
    trialResult: {
      verdict: "Chưa đáp ứng",
      bullets: [
        "Biết lý thuyết kiểm toán nhưng chưa tự làm audit schedule",
        "Chưa biết cách lấy và verify evidence",
        "Phản hồi chậm khi được giao task mới"
      ]
    },
    interviewAnswer: {
      question: 1,
      style: "shallow",
      text: "Em nghĩ mọi người nên tôn trọng nhau trong công việc. Nếu có khác biệt ý kiến thì nên ngồi lại thảo luận một cách chuyên nghiệp. Em luôn lắng nghe ý kiến của người đi trước vì họ có nhiều kinh nghiệm hơn."
    }
  },
  {
    id: "acc_c08",
    name: "Lê Thị Ngân",
    gpa: 3.72,
    internshipMonths: 0,
    projects: 1,
    skills: ["Financial Accounting", "Balance Sheet"],
    note: "Học giỏi nhưng ngại áp dụng",
    quadrant: "Q2",
    outcome: "fail",
    trialResult: {
      verdict: "Cần cải thiện",
      bullets: [
        "Nắm vững nguyên lý kế toán nhưng chậm khi nhập liệu",
        "Thiếu kỹ năng Excel nâng cao (pivot, VBA)",
        "Không chủ động trong công việc, cần giao từng bước"
      ]
    },
    interviewAnswer: {
      question: 2,
      style: "shallow",
      text: "Em sẽ ưu tiên hoàn thành công việc đúng deadline. Nếu gặp khó khăn em sẽ hỏi supervisor hoặc tìm kiếm thông tin trên Internet. Em nghĩ tính cẩn thận là phẩm chất quan trọng nhất của người làm kế toán."
    }
  },
  {
    id: "acc_c09",
    name: "Cao Thị Hương Giang",
    gpa: 3.88,
    internshipMonths: 2,
    projects: 1,
    skills: ["Quick Learner", "Analytical", "Theory Strong"],
    note: "Giỏi lý thuyết, cực kỳ nhạy bén khi lên sổ thật",
    quadrant: "Q2",
    outcome: "success",
    trialResult: {
      verdict: "Học nhanh",
      bullets: [
        "Học MISA trong 3 ngày và lên sổ được ngay",
        "Phát hiện error mà senior miss trong reconciliation",
        "Đặt câu hỏi đúng, hiểu nhanh business model client"
      ]
    },
    interviewAnswer: {
      question: 3,
      style: "concrete",
      text: "Em chưa biết dùng Power BI nhưng team cần dashboard. Em học qua Microsoft Learn 2 buổi tối, connect trực tiếp với data từ SQL server của công ty, build dashboard sales vs budget. Sáng hôm sau present cho CFO, ông ấy ấn tượng và yêu cầu em dạy cho 3 người khác."
    }
  },

  // ── Q3: Low GPA + High practice → 4 success + 1 wildcard fail ──
  {
    id: "acc_c10",
    name: "Nguyễn Văn Phong",
    gpa: 2.85,
    internshipMonths: 18,
    projects: 5,
    skills: ["SME Accounting", "Tax Reports", "Real Bookkeeping"],
    note: "Làm kế toán cho SME 1.5 năm full-time",
    quadrant: "Q3",
    outcome: "success",
    trialResult: {
      verdict: "Kinh nghiệm thực dày",
      bullets: [
        "Xử lý toàn bộ chu kỳ kế toán: lên sổ, kết toán, báo cáo thuế",
        "Làm việc với 3 công ty đồng thời không có sai sót",
        "Biết xử lý tình huống thực tế: thuế chậm nộp, hóa đơn lỗi"
      ]
    },
    interviewAnswer: {
      question: 2,
      style: "concrete",
      text: "Deadline nộp báo cáo tài chính mà owner chưa ký duyệt chi phí. Em kiểm tra xem chi phí nào cần lùi kỳ, chi phí nào có đủ hồ sơ, rồi call trực tiếp owner giải thích risk nộp chậm. Em cũng chuẩn bị sẵn bản draft để owner chỉ cần review 10 phút là ký. Kết quả nộp đúng deadline."
    }
  },
  {
    id: "acc_c11",
    name: "Trần Thị Kim Ngân",
    gpa: 3.00,
    internshipMonths: 12,
    projects: 4,
    skills: ["Payroll", "Insurance", "MISA"],
    note: "Quản lý lương cho công ty 200 nhân viên",
    quadrant: "Q3",
    outcome: "success",
    trialResult: {
      verdict: "Thực tế + cẩn thận",
      bullets: [
        "Xử lý payroll cho 200+ nhân viên chính xác 100%",
        "Setup process tự động tính BHXH, PIT bằng Excel formula",
        "Đào tạo được kế toán mới trong 2 tuần"
      ]
    },
    interviewAnswer: {
      question: 1,
      style: "concrete",
      text: "HR và em tranh nhau về cách tính lương OT cho nhân viên sale. Em pull luật lao động, Circular 10, và so sánh với cách 3 công ty trong ngành đang tính. Em đề xuất dùng bảng thời gian tiêu chuẩn từ Ministry website. HR đồng ý vì có cơ sở pháp lý rõ ràng, sau đó em tạo SOP cho cả phòng."
    }
  },
  {
    id: "acc_c12",
    name: "Phạm Quốc Thành",
    gpa: 2.70,
    internshipMonths: 15,
    projects: 3,
    skills: ["Full-cycle Accounting", "Tax Optimization", "Audit Support"],
    note: "Làm cho công ty thương mại 2 năm",
    quadrant: "Q3",
    outcome: "success",
    trialResult: {
      verdict: "Đáng tin cậy",
      bullets: [
        "Quản lý 3 entity, reconcile intercompany chính xác",
        "Tối ưu thuế GTGT giúp tiết kiệm 500 triệu/năm",
        "Support audit Big4 thành công 2 năm liên tiếp"
      ]
    },
    interviewAnswer: {
      question: 3,
      style: "concrete",
      text: "Công ty áp dụng hóa đơn điện tử, em chưa quen. Em tham gia training của Viettel eInvoice 1 buổi, rồi tự test trên 20 hóa đơn đầu tiên. Em tạo checklist 15 bước cho team follow, và write FAQ document cho common errors. Sau 1 tháng, team chuyển đổi hoàn toàn không có lỗi."
    }
  },
  {
    id: "acc_c13",
    name: "Vũ Thị Mai Linh",
    gpa: 2.90,
    internshipMonths: 10,
    projects: 3,
    skills: ["AR/AP", "Cash Flow Management", "Excel"],
    note: "Quản lý công nợ cho công ty xây dựng",
    quadrant: "Q3",
    outcome: "success",
    trialResult: {
      verdict: "Cẩn trọng + chủ động",
      bullets: [
        "Giảm DSO từ 90 ngày xuống 45 ngày bằng aging report automation",
        "Forecast cash flow chính xác 95% cho 3 tháng tới",
        "Build template tracking công nợ cho 50+ khách hàng"
      ]
    },
    interviewAnswer: {
      question: 1,
      style: "concrete",
      text: "Kế toán mua và em tranh về việc ghi nhận công nợ. Em request meeting với CFO, trình bày 2 approach với example cụ thể từ 3 transactions gần nhất. Em cũng so sánh impact lên cash flow statement. CFO chọn cách em đề xuất vì rõ ràng hơn và align với business reality."
    }
  },
  {
    id: "acc_c14",
    name: "Bùi Văn Quân",
    gpa: 2.75,
    internshipMonths: 8,
    projects: 2,
    skills: ["Tax", "Accounting Software", "Problem Solving"],
    note: "Kỹ năng tốt nhưng thường xuyên đến muộn",
    quadrant: "Q3",
    outcome: "fail",
    trialResult: {
      verdict: "Kỷ luật vấn đề",
      bullets: [
        "Kỹ năng kế toán khá nhưng không tuân thủ giờ giấc",
        "Hay bỏ ngang task giữa chừng để làm việc riêng",
        "Attitude thiếu tôn trọng với supervisor"
      ]
    },
    interviewAnswer: {
      question: 2,
      style: "shallow",
      text: "Em nghĩ deadline là deadline, nhưng nếu công ty không tổ chức tốt thì người làm cũng khó khăn. Em không thích bị ép làm OT mà không được trả thêm. Mọi người nên phân công rõ ràng từ đầu thay vì đổ dồn vào cuối tháng."
    }
  },

  // ── Q4: Low GPA + Low practice → 4 fail ──
  {
    id: "acc_c15",
    name: "Đinh Văn Tâm",
    gpa: 2.50,
    internshipMonths: 0,
    projects: 0,
    skills: ["Basic Office"],
    note: "Chưa có kinh nghiệm kế toán",
    quadrant: "Q4",
    outcome: "fail",
    trialResult: {
      verdict: "Chưa đáp ứng",
      bullets: [
        "Chưa có kiến thức cơ bản về nguyên lý kế toán",
        "Không biết dùng Excel nâng cao hay phần mềm kế toán",
        "Cần training toàn diện từ đầu"
      ]
    },
    interviewAnswer: {
      question: 1,
      style: "shallow",
      text: "Em sẽ lắng nghe ý kiến mọi người và tìm cách giải quyết. Em nghĩ trong công việc cần sự hợp tác và tôn trọng lẫn nhau. Em luôn sẵn sàng học hỏi từ những người có kinh nghiệm hơn."
    }
  },
  {
    id: "acc_c16",
    name: "Lê Thị Ánh Nguyệt",
    gpa: 2.60,
    internshipMonths: 1,
    projects: 0,
    skills: ["Basic Excel"],
    note: "Thực tập 1 tháng nhập liệu",
    quadrant: "Q4",
    outcome: "fail",
    trialResult: {
      verdict: "Cần cải thiện",
      bullets: [
        "Chỉ biết nhập liệu cơ bản, chưa hiểu nghiệp vụ",
        "Làm chậm, dễ sai khi xử lý số liệu lớn",
        "Chưa có kiến thức về thuế và chuẩn mực kế toán"
      ]
    },
    interviewAnswer: {
      question: 3,
      style: "shallow",
      text: "Em sẽ tự học qua các khóa học online và hỏi đồng nghiệp. Em nghĩ chăm chỉ là yếu tố quan trọng nhất. Em đang cố gắng học thêm Excel nâng cao qua YouTube và các diễn đàn kế toán."
    }
  },
  {
    id: "acc_c17",
    name: "Phan Quốc Hùng",
    gpa: 2.40,
    internshipMonths: 0,
    projects: 0,
    skills: ["Word", "Internet"],
    note: "Không có skill liên quan",
    quadrant: "Q4",
    outcome: "fail",
    trialResult: {
      verdict: "Không phù hợp",
      bullets: [
        "Hoàn toàn chưa có kiến thức về kế toán",
        "GPA thấp chứng tỏ thiếu cố gắng trong học tập",
        "Không có portfolio hay chứng chỉ nào liên quan"
      ]
    },
    interviewAnswer: {
      question: 2,
      style: "shallow",
      text: "Em sẽ nỗ lực hết sức để hoàn thành công việc được giao. Em nghĩ nếu có ý chí thì có thể làm được mọi thứ. Em chưa có nhiều kinh nghiệm nhưng em rất muốn học hỏi."
    }
  },
  {
    id: "acc_c18",
    name: "Hoàng Thị Ngọc Diệp",
    gpa: 2.55,
    internshipMonths: 1,
    projects: 0,
    skills: ["Basic Computer Skills"],
    note: "Chuyển ngành sang kế toán năm 4",
    quadrant: "Q4",
    outcome: "fail",
    trialResult: {
      verdict: "Cần học thêm",
      bullets: [
        "Chuyển ngành muộn, kiến thức kế toán còn rất lỏng",
        "Chưa hiểu chu kỳ kế toán cơ bản",
        "Cần ít nhất 3 tháng training trước khi làm việc độc lập"
      ]
    },
    interviewAnswer: {
      question: 3,
      style: "shallow",
      text: "Em biết mình mới chuyển ngành nên cần cố gắng gấp đôi. Em sẽ đăng ký các khóa học ngắn hạn và xin đi thực tập để tích lũy kinh nghiệm. Em tin rằng sự nỗ lực sẽ được đền đáp."
    }
  },

  // ── Wildcards ──
  {
    id: "acc_c19",
    name: "Tô Quang Trung",
    gpa: 3.10,
    internshipMonths: 0,
    projects: 3,
    skills: ["Self-taught CFA L1", "Financial Modeling", "Research"],
    note: "Tự học CFA L1 dù GPA thường, pass lần đầu",
    quadrant: "WILD",
    outcome: "success",
    trialResult: {
      verdict: "Tự học xuất sắc",
      bullets: [
        "Pass CFA Level 1 tự học trong 6 tháng, score above 70th percentile",
        "Build 3-statement financial model cho 5 công ty niêm yết VN",
        "Hiểu sâu về valuation và có khả năng research độc lập"
      ]
    },
    interviewAnswer: {
      question: 3,
      style: "concrete",
      text: "Em tự học CFA L1 bằng CFA Institute curriculum, giải 3000+ practice question trong 6 tháng. Em apply DCF valuation cho cổ phiếu VNM, sau đó so sánh với real price khi báo cáo tài chính ra. Sai số chỉ 5%. Em viết analysis blog và thu hút 2000 views, có analyst từ SSI comment phản biện. Em học được rất nhiều từ đó."
    }
  },
  {
    id: "acc_c20",
    name: "Đặng Thị Lệ Quyên",
    gpa: 3.55,
    internshipMonths: 8,
    projects: 3,
    skills: ["Audit", "IFRS", "Smart"],
    note: "Intern Big4 nhưng có vấn đề đạo đức nghề nghiệp",
    quadrant: "WILD",
    outcome: "fail",
    trialResult: {
      verdict: "Đạo đức vấn đề",
      bullets: [
        "Thành thạo kỹ năng nhưng bị phát hiện sửa số liệu audit",
        "Không transparent với manager khi phát hiện issue",
        "Attitude ngầm cho rằng 'sửa chút thôi không ai biết'"
      ]
    },
    interviewAnswer: {
      question: 1,
      style: "shallow",
      text: "Em nghĩ trong audit đôi khi cần linh hoạt. Không phải lúc nào chuẩn mực cũng áp dụng được hoàn hảo vào thực tế. Em sẵn sàng điều chỉnh để client hài lòng, vì cuối cùng client trả lương cho chúng ta."
    }
  }
];

// ══════════════════════════════════════════════
// INDUSTRY 4 — BUSINESS / SALES
// ══════════════════════════════════════════════

const businessCandidates: Candidate[] = [
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

// ══════════════════════════════════════════════
// INDUSTRY 5 — DESIGN
// ══════════════════════════════════════════════

const designCandidates: Candidate[] = [
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

// ══════════════════════════════════════════════
// INDUSTRY 6 — EDUCATION
// ══════════════════════════════════════════════

const educationCandidates: Candidate[] = [
  // ── Q1: High GPA + High practice → 4 success ──
  {
    id: "edu_c01",
    name: "Nguyễn Thị Hương Giang",
    gpa: 3.85,
    internshipMonths: 8,
    projects: 3,
    skills: ["Modern Pedagogy", "Class Management", "EdTech"],
    note: "Dạy thêm 2 năm, học sinh đậu 100% vào lớp 10",
    quadrant: "Q1",
    outcome: "success",
    trialResult: {
      verdict: "Giáo viên xuất sắc",
      bullets: [
        "Dạy thử 3 buổi, học sinh feedback 9.5/10",
        "Áp dụng flipped classroom tăng interaction 40%",
        "Thiết kế bài giảng digital trên Canva Education rất sinh động"
      ]
    },
    interviewAnswer: {
      question: 1,
      style: "concrete",
      text: "Làm giáo viên, em và giáo viên Toán bất đồng về cách chấm bài. Em đề xuất: cả hai cùng chấm 10 bài chung, so sánh kết quả, thống nhất rubric chi tiết. Em tạo Google Sheet với 5 criteria chấm, mỗi criterion 0-2 điểm. Sau khi thống nhất, cả hai chấm consistent hơn 90%. Em share rubric template cho toàn bộ tổ bộ môn."
    }
  },
  {
    id: "edu_c02",
    name: "Lê Hoàng Long",
    gpa: 3.72,
    internshipMonths: 7,
    projects: 2,
    skills: ["Gamification", "Student Engagement", "Assessment Design"],
    note: "Áp dụng Kahoot, Quizizz vào dạy rất hiệu quả",
    quadrant: "Q1",
    outcome: "success",
    trialResult: {
      verdict: "Sáng tạo trong dạy học",
      bullets: [
        "Thiết kế lesson plan tích hợp game hóa, học sinh tham gia 100%",
        "Tạo quiz adaptive trên Google Forms phân level học sinh",
        "Giảm học sinh yếu từ 30% xuống 10% trong 1 semester"
      ]
    },
    interviewAnswer: {
      question: 2,
      style: "concrete",
      text: "Ngày thứ 3 thực tập, giáo viên chủ nhiệm ốm, em được giao dạy thay cả ngày. Em chưa chuẩn bị bài. Em nhanh chóng review giáo án của giáo viên, tìm activity backup trên TeachersPayTeachers, adjust cho phù hợp level học sinh. Em dạy 4 tiết liên tục, cuối ngày học sinh nói 'cô dạy vui hơn bình thường'. Em note lại kinh nghiệm cho lần sau."
    }
  },
  {
    id: "edu_c03",
    name: "Phạm Thị Thuỳ Linh",
    gpa: 3.92,
    internshipMonths: 10,
    projects: 4,
    skills: ["Special Education", "Differentiated Instruction", "Patience"],
    note: "Tình nguyện dạy trẻ tự kỷ 1 năm",
    quadrant: "Q1",
    outcome: "success",
    trialResult: {
      verdict: "Thấu hiểu học sinh",
      bullets: [
        "Thiết kế IEP (Individual Education Plan) cho 5 học sinh đặc biệt",
        "Áp dụng visual schedule giảm anxiety cho học sinh ADHD",
        "Phụ huynh feedback: 'con tôi tiến bộ rõ rệt từ khi cô dạy'"
      ]
    },
    interviewAnswer: {
      question: 3,
      style: "concrete",
      text: "Em tìm hiểu về differentiated instruction qua course trên Coursera. Em apply ngay vào lớp: chia nhóm 3 level, mỗi level bài tập khác nhau nhưng cùng learning objective. Em dùng checklist để track progress từng nhóm. Sau 1 tháng, học sinh yếu tăng 15 điểm trung bình, học sinh giỏi không bị chán vì có extension activities."
    }
  },
  {
    id: "edu_c04",
    name: "Trần Văn Phú",
    gpa: 3.68,
    internshipMonths: 6,
    projects: 2,
    skills: ["STEM Education", "Project-Based Learning", "Critical Thinking"],
    note: "Dẫn dắt học sinh dự án khoa học đạt giải tỉnh",
    quadrant: "Q1",
    outcome: "success",
    trialResult: {
      verdict: "Truyền cảm hứng",
      bullets: [
        "Thiết kế dự án STEM 'Nước sạch cho trường', học sinh tự build filter",
        "Dạy critical thinking qua Socratic questioning",
        "Học sinh tự tin thuyết trình trước 200 người"
      ]
    },
    interviewAnswer: {
      question: 1,
      style: "concrete",
      text: "Em và giáo viên bộ môn khác tranh nhau thời gian hoạt động ngoại khóa. Em đề xuất merge: giáo viên Toán dạy phần tính toán filter, em dạy phần thuyết trình và viết report. Result: học sinh học được cả 2 skill, tiết kiệm thời gian, và dự án đạt giải nhì cấp tỉnh. Sau đó trường adopt model này cho all STEM projects."
    }
  },

  // ── Q2: High GPA + Low practice → 4 fail + 1 wildcard success ──
  {
    id: "edu_c05",
    name: "Hoàng Thị Minh Tâm",
    gpa: 3.92,
    internshipMonths: 0,
    projects: 0,
    skills: ["Pedagogy Theory", "Curriculum Design", "Philosophy of Education"],
    note: "Luận văn xuất sắc nhưng chưa đứng lớp",
    quadrant: "Q2",
    outcome: "fail",
    trialResult: {
      verdict: "Thiếu thực hành",
      bullets: [
        "Hiểu lý luận dạy học nhưng classroom management yếu",
        "Chưa biết xử lý tình huống thực tế trong lớp",
        "Giảng bài khô khan, học sinh mất tập trung sau 10 phút"
      ]
    },
    interviewAnswer: {
      question: 2,
      style: "shallow",
      text: "Em sẽ chuẩn bị bài giảng thật kỹ và phân phối thời gian hợp lý. Em nghĩ người giáo viên cần có kế hoạch rõ ràng. Em luôn cố gắng hoàn thành chương trình học đúng tiến độ."
    }
  },
  {
    id: "edu_c06",
    name: "Đỗ Văn Khánh",
    gpa: 3.85,
    internshipMonths: 0,
    projects: 1,
    skills: ["Educational Psychology", "Assessment Theory"],
    note: "Nghiên cứu giáo dục tốt nhưng chưa dạy",
    quadrant: "Q2",
    outcome: "fail",
    trialResult: {
      verdict: "Cần thực chiến",
      bullets: [
        "Phân tích learning style rất chi tiết nhưng chưa áp dụng được",
        "Không biết tạo rapport với học sinh",
        "Test design chuẩn nhưng chưa có experience chấm thật"
      ]
    },
    interviewAnswer: {
      question: 3,
      style: "shallow",
      text: "Em thường đọc sách và nghiên cứu về các phương pháp dạy học mới. Em nghĩ nền tảng lý luận rất quan trọng. Em cũng hay tham gia các hội thảo về giáo dục để cập nhật kiến thức."
    }
  },
  {
    id: "edu_c07",
    name: "Mai Thị Ngọc",
    gpa: 3.78,
    internshipMonths: 1,
    projects: 0,
    skills: ["Subject Knowledge", "Lesson Planning"],
    note: "Thực tập quan sát 1 tuần, chưa dạy",
    quadrant: "Q2",
    outcome: "fail",
    trialResult: {
      verdict: "Chưa đáp ứng",
      bullets: [
        "Chuẩn bị giáo án rất chi tiết nhưng lecture quá mịt",
        "Không có classroom management skill",
        "Mất bình tĩnh khi học sinh ồn ào"
      ]
    },
    interviewAnswer: {
      question: 1,
      style: "shallow",
      text: "Em nghĩ trong môi trường giáo dục cần sự tôn trọng và hợp tác. Giáo viên cần làm gương cho học sinh. Em luôn cố gắng giữ thái độ chuyên nghiệp và patience khi làm việc."
    }
  },
  {
    id: "edu_c08",
    name: "Vũ Thị Thanh Nhã",
    gpa: 3.70,
    internshipMonths: 0,
    projects: 1,
    skills: ["Child Development", "Educational Technology"],
    note: "Biết lý thuyết công nghệ giáo dục, chưa dùng",
    quadrant: "Q2",
    outcome: "fail",
    trialResult: {
      verdict: "Cải thiện thực hành",
      bullets: [
        "Biết về Kahoot, Quizizz nhưng chưa từng dùng trong lớp",
        "Viết bài giảng trên Word truyền thống, không sinh động",
        "Cần training về classroom dynamics"
      ]
    },
    interviewAnswer: {
      question: 2,
      style: "shallow",
      text: "Em sẽ ưu tiên hoàn thành nhiệm vụ giảng dạy theo đúng giáo trình. Em nghĩ giáo viên cần bám sát chương trình. Nếu có thời gian em sẽ tích hợp thêm hoạt động thú vị cho học sinh."
    }
  },
  {
    id: "edu_c09",
    name: "Cao Văn Đạt",
    gpa: 3.88,
    internshipMonths: 2,
    projects: 1,
    skills: ["Quick Learner", "Adaptable", "Empathetic"],
    note: "Giỏi lý thuyết, cực kỳ nhạy bén khi đứng lớp thật",
    quadrant: "Q2",
    outcome: "success",
    trialResult: {
      verdict: "Tiềm năng giáo viên",
      bullets: [
        "Lần đầu đứng lớp đã thu hút được 100% học sinh",
        "Áp dụng kiến thức psychology vào classroom management hiệu quả",
        "Học sinh yếu tiến bộ rõ rệt chỉ sau 2 tuần dạy"
      ]
    },
    interviewAnswer: {
      question: 3,
      style: "concrete",
      text: "Em chưa biết dùng Nearpod nhưng thấy giáo viên khác dùng hiệu quả. Em dành 1 buổi tối học qua Nearpod Academy, tạo 1 interactive lesson cho lớp 6. Sáng hôm sau thử teaching, học sinh phản hồi 'cô dạy vui nhất từ đầu năm đến giờ'. Em note lại 5 tips và share cho toàn bộ tổ bộ môn trong weekly meeting."
    }
  },

  // ── Q3: Low GPA + High practice → 4 success + 1 wildcard fail ──
  {
    id: "edu_c10",
    name: "Ngô Thị Cẩm Tú",
    gpa: 2.90,
    internshipMonths: 24,
    projects: 5,
    skills: ["Real Teaching", "Parent Communication", "Exam Preparation"],
    note: "Dạy tại trung tâm 3 năm, học sinh đậu chuyên top",
    quadrant: "Q3",
    outcome: "success",
    trialResult: {
      verdict: "Kinh nghiệm phong phú",
      bullets: [
        "Dạy 500+ học sinh, pass rate chuyên 80%",
        "Build relationship tốt với phụ huynh, retention rate 95%",
        "Xử lý thành công nhiều tình huống khó trong lớp"
      ]
    },
    interviewAnswer: {
      question: 2,
      style: "concrete",
      text: "Trung tâm giao em lớp học sinh cá biệt mà giáo viên khác từ chối. Em dành tuần đầu tiên quan sát, tìm ra nguyên nhân: 3 bạn disrupt vì bài quá dễ, 5 bạn không跟上 vì bài quá khó. Em chia lớp thành 3 group, assign peer tutoring. Sau 1 tháng, cả lớp đạt minimum 7 điểm, không còn học sinh disrupt. Phụ huynh gửi email cảm ơn."
    }
  },
  {
    id: "edu_c11",
    name: "Trần Quốc Toàn",
    gpa: 3.05,
    internshipMonths: 12,
    projects: 4,
    skills: ["Physical Education", "Discipline", "Mentoring"],
    note: "Dạy thể dục + làm giáo viên chủ nhiệm",
    quadrant: "Q3",
    outcome: "success",
    trialResult: {
      verdict: "Quản lý tốt",
      bullets: [
        "Quản lý lớp 45 học sinh công bằng và nghiêm minh",
        "Tổ chức 5 sự kiện trường thành công",
        "Học sinh kính trọng và yêu quý"
      ]
    },
    interviewAnswer: {
      question: 1,
      style: "concrete",
      text: "Hai phụ huynh bất đồng vì con họ bị kỷ luật trong lớp. Em mời cả hai đến trường, present evidence (video học sinh đánh bạn, rule đã được thông báo đầu năm). Em cũng acknowledge cảm xúc của phụ huynh. Cuối cùng cả hai đồng ý và cảm ơn em vì xử lý công bằng. Em note lại quy trình handle parent complaint cho trường."
    }
  },
  {
    id: "edu_c12",
    name: "Phạm Thị Diệu Hằng",
    gpa: 2.70,
    internshipMonths: 18,
    projects: 3,
    skills: ["Early Childhood", "Montessori Method", "Creativity"],
    note: "Dạy mầm non 2 năm, được phụ huynh đề xuất",
    quadrant: "Q3",
    outcome: "success",
    trialResult: {
      verdict: "Yêu thương + chuyên môn",
      bullets: [
        "Áp dụng Montessori method, trẻ tự lập 80%",
        "Thiết kế learning corner đa giác quan",
        "Phụ huynh không muốn chuyển trường vì con thích cô"
      ]
    },
    interviewAnswer: {
      question: 3,
      style: "concrete",
      text: "Trường áp dụng Reggio Emilia approach mới, em chưa biết. Em dành 2 tuần cuối tuần tham quan 3 preschool áp dụng method này, observe teacher interaction với trẻ. Em adapt 5 activities phù hợp context trường mình: light table exploration, nature walk journal, loose parts play. Trẻ phản hồi rất tích cực, em share experience trong school PD session."
    }
  },
  {
    id: "edu_c13",
    name: "Lê Văn Hùng",
    gpa: 2.95,
    internshipMonths: 10,
    projects: 3,
    skills: ["Tutoring", "Test Prep", "Motivational Speaking"],
    note: "Dạy kèm IELTS, học sinh tăng 2.0 band",
    quadrant: "Q3",
    outcome: "success",
    trialResult: {
      verdict: "Hiệu quả rõ rệt",
      bullets: [
        "15/20 học sinh IELTS tăng 1.5+ band trong 3 tháng",
        "Tạo study plan cá nhân hóa cho từng học sinh",
        "Motivational skill giúp học sinh yếu tự tin hơn"
      ]
    },
    interviewAnswer: {
      question: 1,
      style: "concrete",
      text: "Học sinh không chịu làm bài tập em giao. Em không phạt mà tìm hiểu nguyên nhân: bạn ấy đang stress vì parents divorce. Em adjust workload, add 1-on-1 check-in mỗi tuần, và connect bạn với school counselor. Sau 1 tháng, bạn ấy stabilize và catch up được. Em learn rằng teacher need to see the whole child, not just academic performance."
    }
  },
  {
    id: "edu_c14",
    name: "Bùi Thị Thu Trang",
    gpa: 2.80,
    internshipMonths: 8,
    projects: 2,
    skills: ["Subject Knowledge", "Strict", "Result-oriented"],
    note: "Kết quả tốt nhưng quá nghiêm khắc với học sinh",
    quadrant: "Q3",
    outcome: "fail",
    trialResult: {
      verdict: "Thái độ vấn đề",
      bullets: [
        "Học sinh sợ và không muốn đến lớp",
        "Hay chê bai học sinh trước mặt bạn khác",
        "Chỉ tập trung vào điểm số, bỏ qua aspects phát triển khác"
      ]
    },
    interviewAnswer: {
      question: 2,
      style: "shallow",
      text: "Em nghĩ kỷ luật là quan trọng nhất. Học sinh phải sợ giáo viên thì mới học được. Em không đồng ý với cách dạy 'kết bạn' với học sinh. Nhiệm vụ của giáo viên là truyền đạt kiến thức, không phải làm bạn."
    }
  },

  // ── Q4: Low GPA + Low practice → 4 fail ──
  {
    id: "edu_c15",
    name: "Đinh Văn Quân",
    gpa: 2.50,
    internshipMonths: 0,
    projects: 0,
    skills: ["Subject Knowledge basic"],
    note: "Mới ra trường, chưa dạy",
    quadrant: "Q4",
    outcome: "fail",
    trialResult: {
      verdict: "Chưa đáp ứng",
      bullets: [
        "Kiến thức chuyên môn còn lỏng",
        "Chưa có kỹ năng sư phạm cơ bản",
        "Không tự tin khi đứng trước lớp"
      ]
    },
    interviewAnswer: {
      question: 1,
      style: "shallow",
      text: "Em sẽ cố gắng hòa đồng với đồng nghiệp và học hỏi kinh nghiệm. Em nghĩ giáo viên cần sự kiên nhẫn và tận tâm. Em sẽ nỗ lực hết mình vì học sinh."
    }
  },
  {
    id: "edu_c16",
    name: "Nguyễn Thị Ánh Ngọc",
    gpa: 2.60,
    internshipMonths: 1,
    projects: 0,
    skills: ["Basic Teaching"],
    note: "Quan sát 1 tuần, chưa dạy thực tế",
    quadrant: "Q4",
    outcome: "fail",
    trialResult: {
      verdict: "Cải thiện nhiều",
      bullets: [
        "Giọng nói nhỏ, không thu hút học sinh",
        "Chưa biết tạo hoạt động nhóm hay thảo luận",
        "Cần training toàn diện về phương pháp dạy học"
      ]
    },
    interviewAnswer: {
      question: 3,
      style: "shallow",
      text: "Em sẽ tự học qua các khóa học online và xin前辈 hướng dẫn. Em nghĩ giáo viên cần luôn cập nhật kiến thức. Em sẽ nỗ lực cải thiện bản thân mỗi ngày."
    }
  },
  {
    id: "edu_c17",
    name: "Phan Quốc Khánh",
    gpa: 2.35,
    internshipMonths: 0,
    projects: 0,
    skills: ["Basic Computer"],
    note: "Không có kỹ năng sư phạm",
    quadrant: "Q4",
    outcome: "fail",
    trialResult: {
      verdict: "Không phù hợp",
      bullets: [
        "Không có kỹ năng giao tiếp và truyền đạt",
        "Kiến thức chuyên môn yếu",
        "Thiếu đam mê với nghề giáo"
      ]
    },
    interviewAnswer: {
      question: 2,
      style: "shallow",
      text: "Em sẽ cố gắng hoàn thành nhiệm vụ được giao. Em biết mình còn nhiều thiếu sót nhưng rất muốn học hỏi. Em tin rằng nỗ lực sẽ giúp em trở thành giáo viên tốt."
    }
  },
  {
    id: "edu_c18",
    name: "Hoàng Thị Mai",
    gpa: 2.55,
    internshipMonths: 1,
    projects: 0,
    skills: ["Communication basic"],
    note: "Chuyển ngành từ tài chính sang sư phạm",
    quadrant: "Q4",
    outcome: "fail",
    trialResult: {
      verdict: "Cần học thêm",
      bullets: [
        "Chuyển ngành muộn, kiến thức sư phạm còn rất lỏng",
        "Chưa hiểu psychology học sinh",
        "Cần ít nhất 1 năm training trước khi dạy độc lập"
      ]
    },
    interviewAnswer: {
      question: 3,
      style: "shallow",
      text: "Em biết mình mới chuyển ngành nên cần cố gắng gấp đôi. Em sẽ đăng ký các khóa học sư phạm ngắn hạn. Em tin kinh nghiệm làm việc trước đây sẽ giúp em truyền đạt kiến thức thực tế cho học sinh."
    }
  },

  // ── Wildcards ──
  {
    id: "edu_c19",
    name: "Tô Thị Hồng Nhung",
    gpa: 3.10,
    internshipMonths: 0,
    projects: 4,
    skills: ["Self-taught Educator", "YouTube Channel", "Content Creator"],
    note: "Build YouTube giáo dục 50K subs tự học hoàn toàn",
    quadrant: "WILD",
    outcome: "success",
    trialResult: {
      verdict: "Giáo viên thế hệ mới",
      bullets: [
        "Channel YouTube 50K subs dạy Toán miễn phí cho học sinh nghèo",
        "Video có avg 20K views, retention rate 65% rất cao",
        "Tự học video editing, scripting, và pedagogy qua YouTube Creator Academy"
      ]
    },
    interviewAnswer: {
      question: 3,
      style: "concrete",
      text: "Em tự build YouTube channel dạy Toán: đầu tiên study 50 edu-tuber thành công nhất, phân tích video format, hook, pacing. Em test 3 format: board teaching, animation, real-life application. Format 'board + storytelling' win nhất. Em cũng tự learn DaVinci Resolve để edit. 8 tháng sau đạt 50K subs, nhiều học sinh comment 'em hiểu bài lần đầu nhờ cô'."
    }
  },
  {
    id: "edu_c20",
    name: "Đặng Quốc Bửu",
    gpa: 3.55,
    internshipMonths: 8,
    projects: 3,
    skills: ["Subject Expert", "Smart", "Impatient"],
    note: "Giỏi chuyên môn nhưng không kiên nhẫn với học sinh yếu",
    quadrant: "WILD",
    outcome: "fail",
    trialResult: {
      verdict: "Thiếu kiên nhẫn",
      bullets: [
        "Chuyên môn rất sâu nhưng dạy quá nhanh cho học sinh",
        "Hay bực mình khi học sinh không hiểu ngay",
        "Học sinh sợ và mất tự tin khi tiếp xúc"
      ]
    },
    interviewAnswer: {
      question: 1,
      style: "shallow",
      text: "Em nghĩ nếu em giảng rõ ràng mà học sinh không hiểu thì đó là vấn đề của học sinh. Em không có thời gian lặp lại nhiều lần. Trong lớp học cần tốc độ để kịp chương trình. Học sinh yếu nên tự học thêm ở nhà."
    }
  }
];

// ══════════════════════════════════════════════
// EXPORT: Candidate Pool
// ══════════════════════════════════════════════

export const candidatePool: Record<Industry, Candidate[]> = {
  it: itCandidates,
  marketing: marketingCandidates,
  accounting: accountingCandidates,
  business: businessCandidates,
  design: designCandidates,
  education: educationCandidates
};
