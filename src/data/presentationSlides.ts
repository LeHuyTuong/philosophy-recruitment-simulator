export interface PresentationSlide {
  id: string;
  title: string;
  subtitle: string;
  bullets: string[];
  philosophyLink: string;
  speakerNote?: string;
  appConnection?: string; // optional: how this slide connects to the app
  reflectionQuestion?: string[]; // optional reflective questions
  takeaway?: string[]; // optional key takeaways
}

export const presentationSlides: PresentationSlide[] = [
  {
    id: 'problem',
    title: 'Vấn đề: Học giỏi chưa chắc thành công',
    subtitle: 'Điểm số là tín hiệu tốt, nhưng chưa phải toàn bộ năng lực.',
    bullets: [
      'GPA cao thường tạo cảm giác yên tâm khi tuyển chọn.',
      'Nhưng thành công nghề nghiệp còn cần tư duy, thích nghi và kết quả thật.',
      'App đặt câu hỏi: chúng ta đang nhìn vào hiện tượng hay bản chất?',
    ],
    philosophyLink: 'Lý luận nhận thức: nhận thức ban đầu chỉ là điểm xuất phát, phải được kiểm nghiệm qua thực tiễn.',
    speakerNote: 'Mở bằng một niềm tin quen thuộc để kéo người nghe vào câu hỏi trung tâm của sản phẩm.',
    appConnection: 'Người chơi bắt đầu bằng dữ liệu CV/GPA và phải đặt câu hỏi: đây là bản chất hay chỉ là hiện tượng?',
    reflectionQuestion: [
      'Bạn có đang đánh giá ứng viên chỉ bằng một dấu hiệu ban đầu không?',
      'Điều gì chứng minh năng lực thật sự của một người?'
    ],
    takeaway: [
      'CV/GPA là điểm xuất phát, không phải kết luận cuối cùng.',
    ],
  },
  {
    id: 'idea',
    title: 'Ý tưởng sản phẩm: Mô phỏng tuyển dụng bằng triết học',
    subtitle: 'Biến một khái niệm triết học thành trải nghiệm nhập vai.',
    bullets: [
      'Người học đóng vai HR, ra quyết định như trong doanh nghiệp thật.',
      'Mỗi vòng chơi tương ứng với một bước của quá trình nhận thức.',
      'Triết học không đứng riêng như lý thuyết, mà đi cùng tình huống cụ thể.',
    ],
    philosophyLink: 'Phương pháp học qua trải nghiệm: lý luận trở nên dễ hiểu hơn khi gắn với thực tiễn.',
  },
  {
    id: 'flow',
    title: 'Luồng trải nghiệm: Cảm tính → Lý tính → Thực tiễn',
    subtitle: 'Người chơi đi qua ba lớp đánh giá ngày càng sâu.',
    bullets: [
      'Cảm tính: nhìn CV, GPA, kinh nghiệm ban đầu.',
      'Lý tính: phân tích phỏng vấn, lập luận và cách ứng viên trả lời.',
      'Thực tiễn: kiểm nghiệm bằng thử việc và kết quả thực tế.',
    ],
    philosophyLink: 'Học qua trải nghiệm giúp tri thức đi từ hiểu sang làm, từ biết sang vận dụng được, từ nhận thức sang kiểm nghiệm được.',
    appConnection: 'App mô phỏng quá trình từ quan sát hồ sơ đến phỏng vấn và kiểm nghiệm thực tiễn.',
    reflectionQuestion: [
      'Khi dữ liệu ban đầu và kết quả thực tế khác nhau, bạn điều chỉnh nhận thức thế nào?'
    ],
    takeaway: [
      'Luồng trải nghiệm giúp chuyển từ nhận diện hiện tượng sang kiểm nghiệm thực tế.'
    ],
  },
  {
    id: 'round1',
    title: 'Giai đoạn 1: GPA/CV là hiện tượng ban đầu',
    subtitle: 'CV cho dữ liệu đầu vào, nhưng chưa nói hết về con người.',
    bullets: [
      'GPA, số dự án và thực tập là tín hiệu dễ thấy nhất.',
      'Đây là hiện tượng bên ngoài, không phải toàn bộ bản chất.',
      'Người chơi phải chọn trong điều kiện thông tin còn thiếu.',
    ],
    philosophyLink: 'Bản chất – Hiện tượng: hiện tượng cần được đọc đúng trước khi kết luận về bản chất.',
  },
  {
    id: 'round2',
    title: 'Giai đoạn 2: Phân tích để đi tới bản chất',
    subtitle: 'Phỏng vấn giúp đi sâu hơn vào tư duy và khả năng lập luận.',
    bullets: [
      'Câu trả lời cho thấy cách ứng viên suy nghĩ và xử lý tình huống.',
      'Người nói hay chưa chắc làm tốt, nhưng tư duy tốt là dấu hiệu quan trọng.',
      'Đây là bước chuyển từ nhìn thấy sang phân tích.',
    ],
    philosophyLink: 'Cái chung – Cái riêng: quy luật chung về đánh giá năng lực không tồn tại tách rời, mà được biểu hiện qua từng trường hợp cụ thể.',
  },
  {
    id: 'round3',
    title: 'Giai đoạn 3: Thực tiễn kiểm nghiệm năng lực',
    subtitle: 'Thử việc là nơi lời nói phải biến thành kết quả.',
    bullets: [
      'Kết quả thực hiện cho thấy khả năng có thành hiện thực hay không.',
      'Người GPA cao vẫn có thể fail nếu thiếu thực hành.',
      'Người GPA vừa phải vẫn có thể tỏa sáng nhờ năng lực thật.',
    ],
    philosophyLink: 'Thực tiễn là tiêu chuẩn của chân lý: năng lực chỉ được xác nhận qua hoạt động thực tế.',
    appConnection: 'Kết quả thử việc giúp kiểm tra nhận định ban đầu về năng lực.',
    reflectionQuestion: [
      'Kết quả thử việc có khớp với dự đoán ban đầu không?'
    ],
    takeaway: [
      'Năng lực phải được kiểm nghiệm qua kết quả thực tế, không chỉ dựa vào dấu hiệu ban đầu.'
    ],
  },
  {
    id: 'dashboard',
    title: 'Dashboard: Tổng kết nhận thức người học',
    subtitle: 'Dữ liệu lớp giúp nhìn ra xu hướng chung.',
    bullets: [
      'Dashboard cho thấy cách cả lớp ưu tiên GPA, kinh nghiệm hay sự cân bằng.',
      'Từ nhiều lựa chọn riêng lẻ, ta rút ra xu hướng chung.',
      'Giáo viên có thể dùng kết quả để mở thảo luận sâu hơn.',
    ],
    philosophyLink: 'Cái chung – Cái riêng: quy luật chung về đánh giá năng lực không tồn tại tách rời, mà được biểu hiện qua từng trường hợp cụ thể.',
  },
  {
    id: 'value',
    title: 'Giá trị sản phẩm: Biến lý thuyết thành trải nghiệm',
    subtitle: 'Triết học trở nên dễ nhớ hơn khi người học tự trải nghiệm.',
    bullets: [
      'Không đọc lý thuyết một chiều, mà tự ra quyết định rồi đối chiếu kết quả.',
      'Người học cảm được sự khác nhau giữa hiện tượng và bản chất.',
      'Sản phẩm có giá trị giáo dục vì tạo được khoảnh khắc phản tư.',
    ],
    philosophyLink: 'Học qua trải nghiệm giúp tri thức đi từ hiểu sang làm, từ biết sang vận dụng được, từ nhận thức sang kiểm nghiệm được.',
  },
  {
    id: 'ai-usage',
    title: 'AI usage: AI là công cụ hỗ trợ, không thay thế chủ thể',
    subtitle: 'Công cụ có thể tăng tốc, nhưng tư duy vẫn thuộc về con người.',
    bullets: [
      'AI hỗ trợ kỹ thuật, cấu trúc và gợi ý ban đầu.',
      'Phân tích triết học, thiết kế kịch bản và lựa chọn thông điệp do nhóm quyết định.',
      'Điều đó thể hiện vai trò chủ động của chủ thể trong nhận thức.',
    ],
    philosophyLink: 'Nhận thức là quá trình chủ động của con người — công cụ hỗ trợ, nhưng chủ thể nhận thức vẫn là con người.',
    appConnection: 'Phần AI hỗ trợ được ghi nhận trong màn Minh bạch sử dụng AI; nhóm giữ trách nhiệm học thuật và chọn lọc nội dung.',
    reflectionQuestion: [
      'AI hỗ trợ được phần nào trong quy trình mà bạn thấy hữu ích?'
    ],
    takeaway: [
      'AI là công cụ hỗ trợ kỹ thuật và trình bày; lập luận và kết luận thuộc về con người.'
    ],
  },
  {
    id: 'conclusion',
    title: 'Kết luận: Nhận thức đúng phải được kiểm nghiệm bằng thực tiễn',
    subtitle: 'Kết quả cuối cùng quay về bài học trung tâm của toàn bộ app.',
    bullets: [
      'Học giỏi là điều kiện cần, nhưng chưa đủ để kết luận thành công.',
      'Một đánh giá đúng phải đi qua kiểm nghiệm bằng hành động và kết quả.',
      'Đó là thông điệp xuyên suốt của toàn bộ trải nghiệm.',
    ],
    philosophyLink: 'Marx: nhận thức đúng không dừng ở lý thuyết, mà phải được chứng minh trong thực tiễn.',
    speakerNote: 'Kết bằng một câu chốt gọn: vấn đề không phải học giỏi hay không, mà là năng lực có được kiểm nghiệm bằng thực tiễn không.',
  },
];