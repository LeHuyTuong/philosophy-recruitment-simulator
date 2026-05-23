// HireMe Simulator — Presenter Mode Scripts
// Each screen maps to a presentation guide with philosophy connection and talk track.

export interface ScreenNarration {
  title: string;
  headline: string;
  body: string;
  philosophyLink: string;
  action: string;
}

export interface ScreenScript {
  title: string;
  purpose: string;
  philosophy: string;
  talkTrack: string;
  productValue: string;
  transition: string;
  screenNarration: ScreenNarration;
}

export const presentationScripts: Record<string, ScreenScript> = {
  landing: {
    title: "Màn mở đầu",
    purpose:
      "Đặt vấn đề trung tâm: Học giỏi có chắc thành công không? Kéo người học vào một câu hỏi quen thuộc trước khi bước vào thí nghiệm.",
    philosophy:
      'Liên hệ lý luận nhận thức (Chương 2.3). Niềm tin ban đầu "học giỏi = thành công" là một nhận thức cảm tính cần được kiểm nghiệm bằng thực tiễn.',
    talkTrack:
      "Ở màn hình đầu tiên, nhóm em đặt ra một niềm tin rất phổ biến: nhiều sinh viên cho rằng cứ học giỏi thì chắc chắn thành công. Nhưng trong môi trường doanh nghiệp, thành công không chỉ phụ thuộc vào điểm số mà còn phụ thuộc vào khả năng vận dụng kiến thức, xử lý tình huống và tạo ra kết quả thật. Vì vậy, app này biến một câu hỏi triết học thành một thí nghiệm tuyển dụng tương tác.",
    productValue:
      "Màn này giúp kéo triết học ra khỏi lý thuyết khô, đưa người học vào một vấn đề đời sống gần gũi. Thay vì mở bài bằng định nghĩa, app mở bằng cảm xúc và tò mò.",
    transition:
      "Sau khi đặt vấn đề, app cho người chơi chọn ngành để thấy cùng một nguyên lý sẽ biểu hiện khác nhau trong từng lĩnh vực.",
    screenNarration: {
      title: "Màn mở đầu",
      headline: "Học giỏi chưa chắc thành công.",
      body: "Nhiều sinh viên tin rằng GPA cao đồng nghĩa với năng lực tốt. Nhưng trong môi trường doanh nghiệp, thành công phụ thuộc vào nhiều yếu tố: khả năng vận dụng kiến thức, xử lý tình huống, và tạo ra kết quả thực tế. App này biến câu hỏi triết học thành một thí nghiệm tuyển dụng tương tác — bạn đóng vai HR và tự mình trải nghiệm quá trình đánh giá ứng viên.",
      philosophyLink:
        "Lý luận nhận thức (Chương 2.3): nhận thức cảm tính như \"học giỏi = thành công\" là điểm xuất phát, nhưng phải được kiểm nghiệm qua thực tiễn.",
      action: "Nhấn \"Bắt đầu trải nghiệm\" để bước vào vai HR và khám phá sự khác biệt giữa nhận thức cảm tính và bản chất năng lực.",
    },
  },

  industry: {
    title: "Màn chọn ngành",
    purpose:
      "Cho thấy cùng một nguyên lý triết học có thể biểu hiện khác nhau trong từng ngành nghề cụ thể.",
    philosophy:
      "Cặp phạm trù Cái chung – Cái riêng (Chương 2.2.2). Cái chung: thực tiễn kiểm nghiệm năng lực. Cái riêng: tiêu chuẩn thực tiễn khác nhau theo từng ngành.",
    talkTrack:
      "Màn này thể hiện rằng thực tiễn không giống nhau trong mọi ngành. Với IT, thực tiễn là code chạy được và deploy được. Với Marketing, thực tiễn là campaign có conversion thật. Với Kế toán, thực tiễn là báo cáo đúng và audit pass. Tuy biểu hiện khác nhau, tất cả đều có điểm chung: năng lực thật phải được kiểm nghiệm bằng kết quả thực tế.",
    productValue:
      "Thiết kế này giúp app có khả năng mở rộng đa ngành, không chỉ dùng cho một tình huống. Người học thấy triết học không trừu tượng mà biểu hiện cụ thể trong từng nghề.",
    transition:
      "Sau khi chọn ngành, người chơi bắt đầu vòng nhận thức đầu tiên: nhìn vào CV — nhận thức cảm tính.",
    screenNarration: {
      title: "Chọn ngành nghề",
      headline: "Cùng một nguyên lý, biểu hiện khác nhau trong từng ngành.",
      body: "Ở bước này, người dùng đóng vai HR và chọn bối cảnh tuyển dụng. Về mặt triết học, đây là cặp phạm trù Cái chung – Cái riêng: mọi ngành đều cần kiểm nghiệm năng lực qua thực tiễn, nhưng mỗi ngành có tiêu chuẩn biểu hiện khác nhau. IT cần sản phẩm chạy được, Marketing cần chiến dịch có chuyển đổi, Giáo dục cần năng lực truyền đạt.",
      philosophyLink:
        "Cái chung – Cái riêng (Chương 2.2.2): thực tiễn kiểm nghiệm năng lực là điểm chung, nhưng tiêu chuẩn thực tiễn là cái riêng của từng ngành.",
      action: "Chọn một ngành để bắt đầu quá trình nhận thức và đánh giá ứng viên.",
    },
  },

  round1: {
    title: "Giai đoạn 1 · Nhận thức cảm tính",
    purpose:
      "Cho người chơi tiếp xúc với dữ kiện ban đầu: GPA, thực tập, dự án, kỹ năng. Buộc ra quyết định trong điều kiện thông tin chưa đầy đủ.",
    philosophy:
      "Liên hội nhận thức cảm tính và cặp phạm trù Bản chất – Hiện tượng (Chương 2.2.2, 2.3). CV, GPA, bằng cấp là hiện tượng; năng lực nghề nghiệp thật là bản chất cần kiểm nghiệm qua thực tiễn.",
    talkTrack:
      "Ở vòng CV, người chơi chỉ nhìn thấy các dấu hiệu bên ngoài như GPA, số tháng thực tập, số dự án và kỹ năng. Những yếu tố này có giá trị, nhưng chưa đủ để kết luận bản chất năng lực. Nếu chỉ chọn người có GPA cao nhất, người chơi có thể đang nhầm hiện tượng với bản chất — một sai lầm phổ biến trong tuyển dụng thật.",
    productValue:
      "Màn này buộc người chơi ra quyết định trong điều kiện thông tin chưa đầy đủ, giống tuyển dụng thật. Giáo dục trải nghiệm có giá trị vì người học tự mình trải qua thay vì chỉ nghe giảng.",
    transition:
      "Để hiểu sâu hơn, app chuyển sang vòng phỏng vấn — nhận thức lý tính, nơi người chơi đánh giá cách ứng viên tư duy và xử lý vấn đề.",
    screenNarration: {
      title: "Giai đoạn 1 — Nhận thức cảm tính",
      headline: "CV và GPA chỉ là hiện tượng, năng lực thật là bản chất cần kiểm nghiệm.",
      body: "Ở vòng này, bạn chỉ tiếp xúc với dữ kiện bề mặt: GPA, tháng thực tập, số dự án. Đây chính là nhận thức cảm tính — bước đầu của quá trình nhận thức. GPA cao là một tín hiệu, nhưng chưa đủ để kết luận về năng lực thật. Nếu chỉ chọn ứng viên theo GPA, bạn dễ nhầm hiện tượng với bản chất — một sai lầm phổ biến trong tuyển dụng thực tế.",
      philosophyLink:
        "Nhận thức cảm tính (Chương 2.3) + Bản chất – Hiện tượng (Chương 2.2.2): CV và GPA là hiện tượng bên ngoài, năng lực nghề nghiệp là bản chất cần kiểm nghiệm qua thực tiễn.",
      action: "Chọn 5 ứng viên để đưa lên phỏng vấn. Đừng chỉ nhìn GPA — hãy cân nhắc nhiều dấu hiệu.",
    },
  },

  round2: {
    title: "Giai đoạn 2 · Nhận thức lý tính",
    purpose:
      "Cho người chơi phân tích câu trả lời, lập luận và khả năng xử lý tình huống của ứng viên.",
    philosophy:
      "Liên hội nhận thức lý tính (Chương 2.3) và cặp phạm trù Khả năng – Hiện thực (Chương 2.2.2). Lời nói trong phỏng vấn thể hiện khả năng, chưa phải hiện thực.",
    talkTrack:
      "Ở vòng phỏng vấn, người chơi không còn chỉ nhìn vào CV mà bắt đầu phân tích câu trả lời của ứng viên. Đây là bước nhận thức lý tính — đi từ hiện tượng bên ngoài vào bản chất bên trong. Tuy nhiên, phỏng vấn vẫn chỉ là lời nói. Một người nói tốt chưa chắc làm tốt. Vì vậy, khả năng cần được chuyển hóa thành hiện thực thông qua hoạt động thực tế.",
    productValue:
      "Màn này giúp người học hiểu rằng phỏng vấn là cần thiết nhưng không phải tiêu chuẩn cuối cùng. Nó bổ sung nhận thức cảm tính chứ không thay thế thực tiễn.",
    transition:
      "Để kiểm nghiệm lời nói, app cần một vòng thực hành — thử việc.",
    screenNarration: {
      title: "Giai đoạn 2 — Nhận thức lý tính",
      headline: "Nói giỏi chưa chắc làm giỏi. Khả năng cần trở thành hiện thực.",
      body: "Từ dữ liệu bề mặt ở vòng 1, bạn bước vào phân tích sâu hơn qua phỏng vấn. Đây là bước nhận thức lý tính — đi từ hiện tượng vào bản chất, từ cảm tính lên lý tính. Tuy nhiên, lời nói trong phỏng vấn chỉ thể hiện khả năng, chưa phải hiện thực. Một ứng viên trả lời rất hay vẫn có thể thất bại trong thực tế.",
      philosophyLink:
        "Khả năng – Hiện thực (Chương 2.2.2): phỏng vấn cho thấy khả năng tư duy, nhưng khả năng phải được chuyển hóa thành hiện thực thông qua hoạt động thực tế.",
      action: "Đánh giá câu trả lời phỏng vấn và chọn top 3 ứng viên. So sánh với lựa chọn vòng 1 — bạn có đổi ý không?",
    },
  },

  round3: {
    title: "Giai đoạn 3 · Thực tiễn kiểm nghiệm",
    purpose:
      "Cho kết quả thử việc, bộc lộ năng lực thật của ứng viên. Đây là màn bùng nổ — người chơi thấy tiêu chí ban đầu của mình có đúng hay không.",
    philosophy:
      "Thực tiễn là tiêu chuẩn của chân lý (Luận cương về Feuerbach, luận đề 2). Năng lực chỉ được xác nhận khi được kiểm nghiệm bằng hoạt động thực tế. Bản chất dần bộc lộ qua quá trình thực tiễn.",
    talkTrack:
      "Đây là màn quan trọng nhất của app. Ứng viên không chỉ nói mình làm được, mà phải trải qua thử việc thật. Kết quả ở vòng này cho thấy khả năng có trở thành hiện thực hay không. Một người GPA 3.8 nhưng không có kinh nghiệm thực tế có thể không pass. Một người GPA 3.2 nhưng có thực hành phong phú có thể thành công. Điều này không phủ nhận giá trị GPA — GPA là tín hiệu quan trọng — nhưng nó chưa đủ.",
    productValue:
      "Màn này tạo khoảnh khắc 'wow' cho người chơi. Họ tự mình trải nghiệm quá trình thực tiễn kiểm nghiệm nhận thức, thay vì chỉ đọc trong giáo trình.",
    transition:
      "Sau khi có dữ liệu từ cả ba vòng, app tổng hợp và chẩn đoán tư duy tuyển chọn của người chơi.",
    screenNarration: {
      title: "Giai đoạn 3 — Thực tiễn kiểm nghiệm",
      headline: "Thực tiễn là tiêu chuẩn của chân lý. Kết quả thử việc nói lên tất cả.",
      body: "Đây là bước kiểm nghiệm quan trọng nhất. Ứng viên không chỉ trình bày CV hay trả lời phỏng vấn, mà phải thực sự hoàn thành thử việc. Kết quả ở vòng này cho thấy khả năng có trở thành hiện thực hay không. Một người GPA 3.8 nhưng thiếu kinh nghiệm thực tế có thể thất bại, trong khi người GPA 3.2 nhưng có thực hành phong phú lại thành công.",
      philosophyLink:
        "Thực tiễn là tiêu chuẩn của chân lý (Feuerbach, luận đề 2): năng lực chỉ được xác nhận khi kiểm nghiệm bằng hoạt động thực tế. Bản chất bộc lộ qua quá trình thực tiễn.",
      action: "Xem kết quả thử việc và so sánh với đánh giá ban đầu của bạn. Điều gì làm bạn bất ngờ nhất?",
    },
  },

  reveal: {
    title: "Kết quả · Bản chất bộc lộ",
    purpose:
      "Tổng hợp toàn bộ dữ kiện và chẩn đoán tiêu chí tuyển chọn của người chơi: họ ưu tiên GPA, kinh nghiệm, hay cân bằng?",
    philosophy:
      "Bản chất không lộ ra ngay từ hiện tượng ban đầu, mà dần bộc lộ qua quá trình thực tiễn (Cặp phạm trù Bản chất – Hiện tượng). Quá trình nhận thức đi từ trực quan sinh động → tư duy trừu tượng → thực tiễn. Quy luật Lượng – Chất cũng xuất hiện: tích lũy kiến thức, luyện tập và kỹ năng có thể tạo bước chuyển về chất khi được kiểm nghiệm trong công việc.",
    talkTrack:
      "Ở màn kết quả, app không kết luận học giỏi là vô dụng. Ngược lại, học giỏi là một lợi thế. Nhưng GPA chỉ là một tín hiệu ban đầu. Người có khả năng thành công cao hơn là người kết hợp được nền tảng học thuật, kinh nghiệm thực tế, tư duy giải quyết vấn đề và khả năng tạo kết quả thật. Đây chính là phép biện chứng: lý luận phải đi đôi với thực tiễn.",
    productValue:
      "Màn này tạo khoảnh khắc phản tư sâu sắc: người chơi nhìn lại tiêu chí tuyển chọn ban đầu của mình và so sánh với kết quả thực tế.",
    transition:
      "Để hiểu sâu hơn, app tiếp tục so sánh cách đánh giá trong học đường và nghề nghiệp.",
    screenNarration: {
      title: "Kết quả — Bản chất bộc lộ",
      headline: "Bản chất không lộ ngay từ hiện tượng, mà dần bộc lộ qua thực tiễn.",
      body: "Sau ba vòng, app tổng hợp toàn bộ dữ liệu và chẩn đoán tiêu chí tuyển chọn của bạn: bạn ưu tiên GPA, kinh nghiệm, hay cân bằng? Kết quả thực tế có khớp với đánh giá ban đầu không? Đây chính là bài học về quá trình nhận thức: từ trực quan sinh động (CV) qua tư duy trừu tượng (phỏng vấn) đến thực tiễn (thử việc), bản chất dần bộc lộ. Tích lũy kiến thức và kỹ năng là biến đổi về lượng; khi được kiểm nghiệm qua công việc thực tế, năng lực có thể tạo bước chuyển về chất.",
      philosophyLink:
        "Bản chất – Hiện tượng (Chương 2.2.2): bản chất không hiện ra ngay từ hiện tượng ban đầu, mà dần bộc lộ qua quá trình thực tiễn.",
      action: "Xem chẩn đoán tiêu chí của bạn. So sánh lựa chọn ban đầu với kết quả thực tế — bạn rút ra bài học gì?",
    },
  },

  criteria: {
    title: "Đúng – Đủ – Hiệu quả",
    purpose:
      "So sánh tiêu chí đánh giá trong học đường và môi trường nghề nghiệp. Giúp người học hiểu khoảng cách giữa hai hệ thống.",
    philosophy:
      "Nhận thức đúng và đủ là cần thiết, nhưng trong thực tiễn nghề nghiệp còn phải được kiểm nghiệm bằng hiệu quả hành động. Đây là vận dụng phép biện chứng vào đánh giá nhận thức.",
    talkTrack:
      "Trong học đường, một câu trả lời thường được đánh giá bằng đúng và đủ. Nhưng trong nghề nghiệp, đúng và đủ vẫn chưa đủ nếu không tạo ra hiệu quả. Điều này không phủ nhận vai trò của học thuật — lý luận đúng giúp định hướng thực tiễn — mà nhấn mạnh rằng tri thức phải được vận dụng vào thực tế để tạo ra giá trị.",
    productValue:
      "Màn này giúp sinh viên hiểu khoảng cách giữa việc học tốt và làm việc tốt, chuẩn bị tâm lý cho bước chuyển giao từ trường học sang doanh nghiệp.",
    transition:
      "Sau phần cá nhân, app mở rộng ra dữ liệu lớp để xem xu hướng lựa chọn của nhiều người chơi.",
    screenNarration: {
      title: "Đúng — Đủ — Hiệu quả",
      headline: "Học đường đánh giá đúng và đủ. Nghề nghiệp còn cần hiệu quả.",
      body: "Trong học đường, câu trả lời được đánh giá bằng đúng và đủ. Nhưng trong môi trường doanh nghiệp, đúng và đủ thôi chưa đủ — còn phải tạo ra hiệu quả thực tế. Điều này không phủ nhận vai trò của học thuật, mà nhấn mạnh rằng tri thức phải được vận dụng để tạo ra giá trị. Đây là vận dụng phép biện chứng vào đánh giá nhận thức.",
      philosophyLink:
        "Phép biện chứng: nhận thức đúng và đủ là cần thiết, nhưng tri thức phải được kiểm nghiệm bằng hiệu quả hành động trong thực tiễn.",
      action: "So sánh tiêu chí học đường và nghề nghiệp. Bạn thấy khoảng cách nào lớn nhất?",
    },
  },

  dashboard: {
    title: "Dashboard lớp",
    purpose:
      "Tổng hợp dữ liệu người chơi để tạo thảo luận trong lớp. Biến app thành công cụ học tập tương tác.",
    philosophy:
      "Cặp phạm trù Cái chung – Cái riêng. Quy luật chung về đánh giá năng lực không tồn tại tách rời, mà được biểu hiện qua từng trường hợp cụ thể.",
    talkTrack:
      "Dashboard biến app thành một công cụ học tập tương tác. Không chỉ một cá nhân chơi, mà cả lớp tạo ra dữ liệu. Giáo viên có thể dùng dữ liệu này để thảo luận: vì sao nhiều người ưu tiên GPA, vì sao tiêu chí cân bằng thường hiệu quả hơn, và thực tiễn đã phản biện nhận thức ban đầu như thế nào. Xu hướng chung từ nhiều cái riêng chính là biểu hiện của cái chung trong cái riêng.",
    productValue:
      "Màn này giúp sản phẩm có giá trị giáo dục thật: hỗ trợ giảng viên quan sát tư duy của lớp và tạo thảo luận sâu hơn.",
    transition:
      "Cuối cùng, app cho người học nhìn lại toàn bộ trải nghiệm như một quá trình nhận thức biện chứng.",
    screenNarration: {
      title: "Dashboard lớp",
      headline: "Từ nhiều cái riêng, rút ra xu hướng chung.",
      body: "Dashboard tổng hợp dữ liệu của cả lớp thành biểu đồ trực quan. Quy luật chung về đánh giá năng lực không tồn tại tách rời, mà được biểu hiện qua từng trường hợp cụ thể. Giáo viên có thể dùng dữ liệu này để thảo luận: vì sao nhiều người ưu tiên GPA, vì sao phương pháp cân bằng thường hiệu quả hơn.",
      philosophyLink:
        "Cái chung – Cái riêng (Chương 2.2.2): từ nhiều cái riêng, ta rút ra cái chung — xu hướng nhận thức chung của cả lớp.",
      action: "Xem biểu đồ tổng hợp và thảo luận: kết quả lớp phản ánh điều gì về nhận thức tuyển dụng?",
    },
  },

  schools: {
    title: "Các lập trường triết học về vật chất, ý thức và nhận thức",
    purpose:
      "Giúp người học so sánh các cách nhìn khác nhau về chân lý và nhận thức trong lịch sử triết học, liên hệ với tình huống tuyển dụng.",
    philosophy:
      "So sánh duy tâm chủ quan (Berkeley), duy tâm khách quan (Plato, Hegel), hoài nghi luận (truyền thống hoài nghi; Hume là đại biểu liên quan), thuyết bất khả tri (Hume, Kant), thuyết khả tri và duy vật siêu hình (các nhà duy vật thế kỷ XVII–XVIII) cùng duy vật biện chứng (Marx-Lenin).",
    talkTrack:
      "Màn này dùng tuyển dụng như một ví dụ đời sống để minh họa các lập trường triết học về vật chất, ý thức và khả năng nhận thức. Các ví dụ tuyển dụng trong màn này là phần minh họa ứng dụng, không phải nội dung nguyên văn của giáo trình. Nếu chỉ dựa vào cảm giác ban đầu, đánh giá dễ rơi vào chủ quan. Nếu chỉ nhìn các chỉ số tĩnh, đánh giá dễ máy móc. Nếu hoài nghi tuyệt đối, con người khó ra quyết định. Cách tiếp cận phù hợp hơn là xem xét ứng viên trong mối liên hệ, quá trình phát triển và kiểm nghiệm qua thực tiễn.",
    productValue:
      "Màn này biến kiến thức lịch sử triết học thành tình huống dễ hiểu trong tuyển dụng, giúp người học ghi nhớ tự nhiên.",
    transition:
      "Từ đó, người học quay lại câu hỏi ban đầu: học giỏi có chắc thành công không? Câu trả lời là: học giỏi là điều kiện cần, chưa phải điều kiện đủ.",
    screenNarration: {
      title: "Các lập trường triết học về vật chất, ý thức và nhận thức",
      headline: "Mỗi lập trường triết học có thể được minh họa bằng một cách đánh giá con người trong tuyển dụng.",
      body: "Màn này dùng tuyển dụng như một ví dụ đời sống để minh họa các lập trường triết học về vật chất, ý thức và khả năng nhận thức. Các ví dụ tuyển dụng trong màn này là phần minh họa ứng dụng, không phải nội dung nguyên văn của giáo trình. Nếu chỉ dựa vào cảm giác ban đầu, đánh giá dễ rơi vào chủ quan. Nếu chỉ nhìn các chỉ số tĩnh, đánh giá dễ máy móc. Nếu hoài nghi tuyệt đối, con người khó ra quyết định. Cách tiếp cận phù hợp hơn là xem xét ứng viên trong mối liên hệ, quá trình phát triển và kiểm nghiệm qua thực tiễn.",
      philosophyLink:
        "Duy vật biện chứng (Marx-Lenin): xem xét nhiều mặt, kiểm nghiệm bằng thực tiễn — chính là cách app vận hành qua ba vòng đánh giá.",
      action: "So sánh các lập trường và nhận ra: phương pháp nào gần nhất với cách bạn đã đánh giá ứng viên?",
    },
  },

  "final-poll": {
    title: "Khảo sát cuối kỳ",
    purpose:
      "Cho người học phản tư: sau trải nghiệm này, họ sẽ thay đổi gì trong cách học? Đây là mục tiêu giáo dục cuối cùng.",
    philosophy:
      "Phép biện chứng duy vật không chỉ giải thích thế giới mà còn nhằm cải tạo thế giới. Nhận thức đúng phải dẫn đến hành động đúng (Marx: các nhà triết học chỉ giải thích thế giới theo nhiều cách, song vấn đề là cải tạo thế giới).",
    talkTrack:
      "Sau khi trải qua 3 vòng mô phỏng tuyển dụng, người chơi được hỏi một câu quan trọng: bạn sẽ thay đổi gì? Nếu chọn kết hợp học và thực hành, nghĩa là app đã đạt được mục tiêu giáo dục — giúp người học nhận thức được giá trị của thực tiễn. Đây là ví dụ cho nguyên lý: lý luận đúng dẫn đến thực tiễn đúng.",
    productValue:
      "Màn này đo lường hiệu quả giáo dục của sản phẩm. Nếu phần lớn người chơi chọn 'kết hợp học + thực hành', app đã thành công trong việc truyền đạt triết học.",
    transition:
      "Cảm ơn người chơi đã tham gia. Có thể tham khảo thêm phần AI Usage để hiểu quá trình phát triển.",
    screenNarration: {
      title: "Khảo sát cuối kỳ",
      headline: "Nhận thức đúng phải dẫn đến hành động đúng.",
      body: "Sau ba vòng mô phỏng, câu hỏi cuối cùng là: bạn sẽ thay đổi gì trong cách học? Đây là mục tiêu giáo dục cốt lõi — nhận thức không dừng ở việc hiểu, mà phải dẫn đến hành động. Phép biện chứng duy vật không chỉ giải thích thế giới, mà nhằm cải tạo thế giới. Nếu bạn chọn kết hợp học và thực hành, app đã đạt được mục tiêu.",
      philosophyLink:
        "Marx: \"Các nhà triết học chỉ giải thích thế giới theo nhiều cách, song vấn đề là cải tạo thế giới.\" Nhận thức đúng phải dẫn đến thực tiễn đúng.",
      action: "Trả lời khảo sát: sau trải nghiệm này, bạn sẽ thay đổi gì trong cách học và rèn luyện?",
    },
  },

  "ai-usage": {
    title: "Minh bạch sử dụng AI",
    purpose:
      "Cam kết liêm chính học thuật: AI đóng vai trò hỗ trợ, con người đóng vai trò chủ động trong tư duy và phân tích.",
    philosophy:
      "Nhận thức là quá trình chủ động của con người — công cụ hỗ trợ, nhưng chủ thể nhận thức vẫn là con người.",
    talkTrack:
      "Nhóm em muốn minh bạch rằng AI chỉ đóng vai trò hỗ trợ kỹ thuật — tạo boilerplate code, gợi ý cấu trúc. Toàn bộ phân tích triết học, lập luận, thiết kế kịch bản game là sản phẩm tư duy của nhóm. Điều này đúng với nguyên lý: công cụ là điều kiện cần, tư duy chủ thể là điều kiện quyết định.",
    productValue:
      "Phần này thể hiện tính liêm chính và chuyên nghiệp của nhóm, đồng thời minh họa rằng sử dụng công nghệ không mâu thuẫn với tư duy độc lập.",
    transition:
      "Đó là toàn bộ trải nghiệm HireMe Simulator. Cảm ơn thầy cô và các bạn đã lắng nghe.",
    screenNarration: {
      title: "Minh bạch sử dụng AI",
      headline: "AI là công cụ hỗ trợ, tư duy con người là yếu tố quyết định.",
      body: "Nhóm cam kết minh bạch: AI chỉ đóng vai trò hỗ trợ kỹ thuật — tạo code cơ bản, gợi ý cấu trúc. Toàn bộ phân tích triết học, lập luận, thiết kế kịch bản game là sản phẩm tư duy của nhóm. Điều này đúng với nguyên lý: công cụ là điều kiện cần, tư duy chủ thể là điều kiện quyết định. Sử dụng công nghệ không mâu thuẫn với tư duy độc lập.",
      philosophyLink:
        "Nhận thức là quá trình chủ động của con người — công cụ hỗ trợ, nhưng chủ thể nhận thức vẫn là con người.",
      action: "Xem chi tiết cách nhóm sử dụng AI và cam kết liêm chính học thuật.",
    },
  },
};
