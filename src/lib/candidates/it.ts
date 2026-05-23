import type { Candidate } from './types';

export const candidates: Candidate[] = [
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
        "Chủ động refactor lại module cũ giảm 30% response time",
        "Hợp tác tốt với team, chịu nhận task khó khi teammate ốm"
      ]
    },
    interviewAnswer: {
      question: 1,
      style: "concrete",
      text: "Lần đó 2 bạn frontend tranh nhau kiến trúc component, em đề nghị mỗi người vẽ prototype rồi cả team vote. Em dùng Confluence ghi lại quyết định để sau không ai cãi lại. Kết quả cả hai đều đồng ý với hướng đi chung."
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
    gpa: 2.45,
    internshipMonths: 0,
    projects: 0,
    skills: ["Basic HTML", "CSS"],
    note: "Chưa có project thực, chủ yếu học lý thuyết",
    quadrant: "Q4",
    outcome: "fail",
    trialResult: {
      verdict: "Chưa sẵn sàng",
      bullets: [
        "Code HTML cơ bản, chưa biết framework nào",
        "Cần hỗ trợ từng bước, không tự debug được",
        "Thiếu nền tảng thực hành để làm việc độc lập"
      ]
    },
    interviewAnswer: {
      question: 1,
      style: "shallow",
      text: "Em tự học Spring WebFlux qua video Baeldung rồi áp dụng ngay vào project chat real-time của CLB. Đầu tiên code lỗi nhiều, nhưng em debug từng bài rồi blog lại bài học kinh nghiệm trên Medium. Sau đó hướng dẫn 3 bạn junior khác cùng dùng reactive programming."
    }
  },
  {
    id: "it_c04",
    name: "Phạm Đức Long",
    gpa: 2.6,
    internshipMonths: 1,
    projects: 0,
    skills: ["Office", "Canva"],
    note: "Thực tập 1 tháng ngắn ngày, không liên quan tech",
    quadrant: "Q4",
    outcome: "fail",
    trialResult: {
      verdict: "Cần học thêm nhiều",
      bullets: [
        "Chỉ biết dùng công cụ văn phòng, không có kỹ năng lập trình",
        "Thực tập ở vị trí admin, không có kinh nghiệm phát triển phần mềm",
        "Cần training dài hạn mới có thể làm việc được"
      ]
    },
    interviewAnswer: {
      question: 2,
      style: "shallow",
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
      text: "Em sẽ phân tích vấn đề thành các phần nhỏ rồi giải quyết từng cái một. Em nghĩ lên kế hoạch là rất quan trọng nên sẽ dành thời gian thiết kế giải pháp trước khi code. Em luôn cố gắng hoàn thành đúng deadline."
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
      text: "Em thường đọc sách và xem video để học thêm kiến thức mới. Em cho rằng việc tự học là rất quan trọng trong ngành IT vì công nghệ thay đổi liên tục. Em luôn cố gắng cập nhật kiến thức mỗi ngày."
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
        "Hiểu sâu về OS nhưng không áp dụng được vào project web",
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
      text: "Em được giao task machine learning nhưng chưa biết PyTorch. Em đọc docs 2 buổi tối, làm theo tutorial MNIST rồi adapt vào data thật của công ty. Tuần sau đã train được model đạt yêu cầu. Em ghi chú lại bước đi trong Notion để team khác tham khảo."
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
      text: "Lần đó dev không đồng ý bug em report, nói 'expected behavior'. Em quay video reproduce bug, thêm screenshot log, và so sánh với requirement document. Dev xem lại rồi thừa nhận là bug thật. Từ đó em tạo template bug report chuẩn cho cả team QA dùng."
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
      text: "Em thường tự tìm hiểu qua YouTube và Google. Em cho rằng trong thời đại này ai cũng có thể tự học được nếu có ý chí. Em đang cố gắng học thêm lập trình cơ bản qua các course miễn phí."
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
      text: "Em tự học Rust qua 'The Rust Book' rồi viết CLI tool manage task cho cá nhân. Khi thấy nó hữu ích em open-source lên GitHub. Có contributor từ 5 nước khác fork và contribute lại. Em học được code review skill từ community, nhiều hơn cả thực tập ở công ty nhỏ."
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
