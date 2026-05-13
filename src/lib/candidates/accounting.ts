import type { Candidate } from './types';

export const candidates: Candidate[] = [
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
