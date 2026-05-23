import type { Candidate } from './types';

export const candidates: Candidate[] = [
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
      text: "Làm giáo viên, em và giáo viên Toán bất đồng về cách chấm bài. Em đề xuất: cả hai cùng chấm 10 bài chung, so sánh kết quả, thống nhất tiêu chí đánh giá chi tiết. Em tạo Google Sheet với 5 tiêu chí chấm, mỗi tiêu chí 0-2 điểm. Sau khi thống nhất, cả hai chấm nhất quán hơn 90%. Em chia sẻ mẫu tiêu chí đánh giá cho toàn bộ tổ bộ môn."
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
      text: "Ngày thứ 3 thực tập, giáo viên chủ nhiệm ốm, em được giao dạy thay cả ngày. Em chưa chuẩn bị bài. Em nhanh chóng xem lại giáo án của giáo viên, tìm hoạt động dự phòng trên TeachersPayTeachers, điều chỉnh cho phù hợp trình độ học sinh. Em dạy 4 tiết liên tục, cuối ngày học sinh nói 'cô dạy vui hơn bình thường'. Em ghi chú lại kinh nghiệm cho lần sau."
    }
  },
  {
    id: "edu_c03",
    name: "Phạm Thị Thuỳ Linh",
    gpa: 2.46,
    internshipMonths: 0,
    projects: 0,
    skills: ["Lý thuyết sư phạm", "Word"],
    note: "Học sư phạm lý thuyết, chưa từng đứng lớp dạy thực",
    quadrant: "Q4",
    outcome: "fail",
    trialResult: {
      verdict: "Thiếu kinh nghiệm thực dạy",
      bullets: [
        "Soạn giáo án đúng mẫu nhưng không phù hợp trình độ học sinh thực",
        "Lần đầu dạy thử bị mất kiểm soát lớp sau 15 phút",
        "Chưa biết xử lý các tình huống học sinh đặt câu hỏi ngoài giáo án"
      ]
    },
    interviewAnswer: {
      question: 2,
      style: "shallow",
      text: "Em tìm hiểu về dạy học phân hóa qua khóa học trên Coursera. Em áp dụng ngay vào lớp: chia nhóm 3 trình độ, mỗi trình độ bài tập khác nhau nhưng cùng mục tiêu học tập. Em dùng danh sách kiểm tra để theo dõi tiến độ từng nhóm. Sau 1 tháng, học sinh yếu tăng 15 điểm trung bình, học sinh giỏi không bị chán vì có hoạt động mở rộng."
    }
  },
  {
    id: "edu_c04",
    name: "Trần Văn Phú",
    gpa: 2.58,
    internshipMonths: 1,
    projects: 0,
    skills: ["Office", "Lý thuyết giáo dục"],
    note: "Thực tập trường 1 tháng dự giờ, chưa tự đứng lớp",
    quadrant: "Q4",
    outcome: "fail",
    trialResult: {
      verdict: "Chưa đủ kỹ năng thực dạy",
      bullets: [
        "Chỉ dự giờ quan sát, chưa có kinh nghiệm tự giảng dạy",
        "Kỹ năng quản lý lớp học gần như không có",
        "Giáo án soạn được nhưng thiếu hoạt động tương tác"
      ]
    },
    interviewAnswer: {
      question: 1,
      style: "shallow",
      text: "Em và giáo viên bộ môn khác tranh nhau thời gian hoạt động ngoại khóa. Em đề xuất gộp: giáo viên Toán dạy phần tính toán bộ lọc, em dạy phần thuyết trình và viết báo cáo. Kết quả: học sinh học được cả 2 kỹ năng, tiết kiệm thời gian, và dự án đạt giải nhì cấp tỉnh. Sau đó trường áp dụng mô hình này cho tất cả dự án STEM."
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
      text: "Em nghĩ trong môi trường giáo dục cần sự tôn trọng và hợp tác. Giáo viên cần làm gương cho học sinh. Em luôn cố gắng giữ thái độ chuyên nghiệp và kiên nhẫn khi làm việc."
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
      text: "Em chưa biết dùng Nearpod nhưng thấy giáo viên khác dùng hiệu quả. Em dành 1 buổi tối học qua Nearpod Academy, tạo 1 bài giảng tương tác cho lớp 6. Sáng hôm sau thử dạy, học sinh phản hồi 'cô dạy vui nhất từ đầu năm đến giờ'. Em ghi chú lại 5 mẹo và chia sẻ cho toàn bộ tổ bộ môn trong buổi họp hàng tuần."
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
      text: "Trung tâm giao cho em lớp học sinh cá biệt mà giáo viên khác từ chối. Em dành tuần đầu tiên để quan sát và tìm nguyên nhân: 3 bạn thường xuyên gây mất trật tự vì bài quá dễ, còn 5 bạn không theo kịp vì bài quá khó. Em chia lớp thành 3 nhóm theo trình độ và phân công các bạn khá hơn hỗ trợ các bạn yếu hơn. Sau 1 tháng, cả lớp đạt tối thiểu 7 điểm, tình trạng mất trật tự giảm rõ rệt, và phụ huynh gửi email cảm ơn."
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
      text: "Hai phụ huynh bất đồng vì con họ bị kỷ luật trong lớp. Em mời cả hai đến trường, trình bày bằng chứng (video học sinh đánh bạn, quy định đã được thông báo đầu năm). Em cũng thấu hiểu cảm xúc của phụ huynh. Cuối cùng cả hai đồng ý và cảm ơn em vì xử lý công bằng. Em ghi chú lại quy trình xử lý khiếu nại của phụ huynh cho trường."
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
      text: "Trường áp dụng phương pháp Reggio Emilia mới, em chưa biết. Em dành 2 tuần cuối tuần tham quan 3 trường mầm non áp dụng phương pháp này, quan sát tương tác của giáo viên với trẻ. Em chuyển đổi 5 hoạt động phù hợp bối cảnh trường mình: khám phá bàn ánh sáng, nhật ký đi dạo thiên nhiên, chơi với vật liệu tự do. Trẻ phản hồi rất tích cực, em chia sẻ kinh nghiệm trong buổi đào tạo chuyên môn của trường."
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
      text: "Học sinh không chịu làm bài tập em giao. Em không phạt mà tìm hiểu nguyên nhân: bạn ấy đang căng thẳng vì cha mẹ ly hôn. Em điều chỉnh lượng bài tập, tạo thêm trao đổi riêng 1-1 mỗi tuần, và kết nối bạn với chuyên viên tư vấn tâm lý học đường. Sau 1 tháng, bạn ấy ổn định và theo kịp được. Em học được rằng giáo viên cần nhìn nhận học sinh toàn diện, không chỉ kết quả học tập."
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
      text: "Em sẽ tự học qua các khóa học online và xin giáo viên có kinh nghiệm hướng dẫn. Em nghĩ giáo viên cần luôn cập nhật kiến thức. Em sẽ nỗ lực cải thiện bản thân mỗi ngày."
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
      text: "Em tự xây dựng kênh YouTube dạy Toán: đầu tiên nghiên cứu 50 giáo dục viên trên YouTube thành công nhất, phân tích định dạng video, điểm thu hút, nhịp độ. Em thử nghiệm 3 định dạng: dạy trên bảng, hoạt hình, ứng dụng thực tế. Định dạng 'bảng + kể chuyện' hiệu quả nhất. Em cũng tự học DaVinci Resolve để dựng. 8 tháng sau đạt 50K người đăng ký, nhiều học sinh bình luận 'em hiểu bài lần đầu nhờ cô'."
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
