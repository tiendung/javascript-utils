// ==UserScript==
// @name           iGoogle
// @namespace      hack
// @description    change the default width of gadget containers
// @include        http://www.google.com/ig
// ==/UserScript==
(function () {

// util function
function $(id) { 
	return typeof id === "string" ? 
	  document.getElementById(id) : 
		id; 
}

function hide(id) { 
	(e = $(id)) && e.style && (e.style.display = "none");
	return arguments.callee; 
}

function width(id, value) { 
	(e = $(id)) && e.style && (e.style.width = value);
	return arguments.callee; 
}

var EMPHASIS_ITEMS_WEIGHT = 0;
var EMPHASIS_ITEMS_NO = 0;

function randomInt( n ) {
  return Math.round( Math.random() * (n - 1) );
}

function random( low, high ) {
  var length = high - low + EMPHASIS_ITEMS_WEIGHT - EMPHASIS_ITEMS_NO;
  return function () { 
    var index = randomInt(length) + low - EMPHASIS_ITEMS_WEIGHT; 
    return (index < 0) ? randomInt( EMPHASIS_ITEMS_NO ) : index;
  };
}

var notes = [
// "<b>Thở</b><a href='http://www.quangduc.com/Thien/86anlac1.html'>Thở vào biết thở vào<br/> Thở ra biết thở ra<br/> Hơi thở vào đã sâu<br/> Hơi thở ra đã chậm<br/> Thở vào tôi thấy khỏe<br/></a><br /><a href='http://www.langmai.org/TNH/Sach/ChiNamThienTap/ChiNam1.htm'>Thở ra tôi thấy nhẹ<br/> Thở vào tâm tĩnh lặng<br/> Thở ra miệng mỉm cười<br/> An trú trong hiện tại<br/> Giây phút đẹp tuyệt vời</a>",
// "<b>Thở</b><a href='http://www.langmai.org/PhapMon/html/ThiKe2.htm'><td> Ðã về. Ðã tới<br />Bây giờ. Ở đây<br />Vững chãi. Thảnh thơi<br />Quay về. Nương tựa<br />Nay tôi đã về<br />Nay tôi đã tới </td><td>&nbsp;&nbsp;</td><td>&nbsp;&nbsp;</td><td> An trú bây giờ<br />An trú ở đây<br />Vững chãi như núi xanh<br />Thảnh thơi dường mây trắng<br />Cửa vô sinh mở rồi<br />Trạm nhiên và bất động </td></a>",
// "<b>Thở</b><br /><a href='http://www.langmai.org/TinTuc/KiTruoc/Pages/ttpt26-03.htm'>Quay về nương tựa<br />Hải đảo tự thân<br />Chánh niệm là Bụt<br />Soi sáng xa gần<br />Hơi thở là pháp<br />Bảo hộ thân tâm<br />Năm uẩn là Tăng<br />Phối hợp tinh cần<br /></a><br /><a href='http://www.langmai.org/TNH/Sach/ChiNamThienTap/ChiNam4.htm'>Thở vào<br />Thở ra<br />Là hoa tươi mát<br />Là núi vững vàng<br />Nước tĩnh lặng chiếu<br />Không gian thênh thang…<br /></a>",
// "<b>Ðánh răng</b><br /><a href='http://www.langmai.org/PhapMon/html/ThiKe1.htm'>Ðánh răng và súc miệng<br /> Cho sạch nghiệp nói năng<br /> Miệng thơm lời chánh ngữ<br />Hoa nở tự vườn tâm<br /></a>",
// "Sức mạnh thật sự không nằm ở chổ ta có nhiều quyền hành, tiền bạc hay khí giới,<br /> sức mạnh thật sự nằm sâu trong lòng ta khi ta có đủ trầm tĩnh và vững chãi.</b>",
// "Chánh niệm là năng lượng có khả năng nhận diện được những gì đang xảy ra trong ta và chung quanh ta.<br /> Khi năng lượng ấy có mặt thì thân và tâm ta hợp nhất và ta thực sự có mặt trong giây phút hiện tại để sống sâu sắc hằng ngày.<br />Tâm ta không bị những tiếc nuối về quá khứ hoặc những lo lắng về tương lai lôi kéo.</b>",
// "Tự do, giải thoát và an lạc không do ai mang tới cho ta hết. <br /> Tự do, giải thoát và an lạc như cái giếng nước nằm sâu trong ta, ta phải đào sâu nó ngay bây giờ. <br /> Ta phải trở về với giây phút hiện tại để sống cho sâu sắc; <br /> ta thực tập hơi thở chánh niệm để có thể tiếp xúc được với giây phút hiện tại </b>",  
// "<b>Thức dậy</b><br />Thức dậy miệng mỉm cười<br />Hăm bốn giờ tinh khôi<br />Xin nguyện sống trọn vẹn<br />Mắt thương nhìn cuộc đời<br />",
// "<b>Xếp mền</b><br />Xếp mền cho niềm vui<br />Sống ngăn nắp cuộc đời<br />Thân và tâm thúc liễm<br />Phiền não phải rụng rơi<br />",
// "<b>Vặn nước</b><br />Nước từ nguồn suối cao<br />Nước từ lòng đất sâu<br />Nước màu nhiệm tuôn chảy<br />Ơn nước luôn tràn đầy.<br />",
// "<b>Trước khi nổ máy xe</b><br />Trước khi cho máy nổ<br />Tôi biết tôi đi đâu<br />Xe với tôi là một<br />Xe mau tôi cũng mau<br />",
// "<b>Bật đèn</b><br />Thất niệm là bóng đêm<br />Chánh niệm là ánh sáng<br />Đưa tỉnh thức trở về<br />Cho thế gian tỏ rạng<br />",
// "<b>Tắm</b><br />Không sinh cũng không diệt<br />Không trước cũng không sau<br />Trao truyền và tiếp thọ<br />Pháp giới tính nhiệm màu<br />",
// "Lên hay xuống cầu thang<br />Bước chân thường nhẹ nhàng<br />Nếu nghe tiếng lộp cộp<br />Là biết lòng chưa an<br />",
// "<b>Mở máy điện toán</b><br /><a href='http://www.langmai.org/PhapMon/html/ThiKe2.htm'>Thắp lên máy điện toán<br />Ý tiếp xúc với Tàng<br />Tập khí nguyện chuyển hóa<br />Nuôi lớn Hiểu và Thương<br /></a>",
// "<b>Nâng chén trà lên</b><br /><a href='http://www.langmai.org/PhapMon/html/ThiKe2.htm'>Chén trà trong hai tay<br />Chánh niệm nâng tròn đầy<br />Thân và tâm an trú<br />Bây giờ và ở đây<br /></a>",
// "<b>Đổ rác</b><br /><a href='http://www.langmai.org/PhapMon/html/ThiKe2.htm'>Một thùng rác bẩn<br />Một bông hồng thơm<br />Muôn vật chuyển hóa<br />Thường trong vô thường<br /></a>",
// "<b>Rửa mặt</b><br />Rửa mặt là rửa tâm<br />Sạch hết mọi cấu trần<br />Để cho nguồn an lạc<br />Đi vào cả châu thân<br />",
// "<b>Nghe chuông</b><br />Lắng lòng nghe, lắng lòng nghe<br />Tiếng chuông huyền diệu đưa về nhất tâm<br />",
// "<b>Thiền hành</b><br />Ý về muôn vạn nẻo<br />Thiền lộ tâm an nhiên<br />Từng bước gió mát dậy<br />Từng bước nở hoa sen<br />",
// "<b>Quơ dép</b><br />Ðặt chân trên mặt đất<br />Là thể hiện thần thông<br />Từng bước chân tỉnh thức<br />Làm hiển lộ pháp thân<br />",
// "<b>Xếp giày dép</b><br />Đặt dép dày ngay ngắn<br />Xin nguyện cho mọi người<br />Đôi chân thường chánh niệm<br />Vào ra luôn thảnh thơi<br />",
// "<b>Mở cửa sổ</b><br />Mở cửa nhìn pháp thân<br />Ðời mầu nhiệm không cùng<br />Lòng dặn lòng tỉnh thức<br />Giòng nước tâm trong ngần<br />",
// "Múc nước để rửa tay<br />Xin nguyện cho mọi người<br />Có đôi bàn tay khéo<br />Gìn giữ trái đất này<br />",
// "<b>Ngồi thiền sáng</b><br />Pháp thân tỏa sáng buổi ban mai<br />Tĩnh tọa lòng an miệng mỉm cười<br />Ngày mới nguyện đi trong tỉnh thức<br />Mặt trời trí tuệ rạng muôn nơi.<br />",
// "Không nhơ cũng không sạch<br />Không bớt cũng không thêm<br />Trí tuệ Ba La Mật<br />Không có pháp nào trên<br />",
// "<b>Nhấc điện thoại</b><br />Tiếng đi ngoài ngàn dặm<br />Xây dựng niềm tin yêu<br />Mỗi lời là châu ngọc<br />Mỗi lời là gấm thêu<br />",
// "<b>Rửa chân</b><br />Sự an lạc<br />Của ngón chân<br />Niềm an lạc<br />Của thân tâm<br />",
// "<b>Rửa bát</b><br />Giẻ rửa bát trong tay<br />Ta rửa bát ngàn đời<br />Bát dơ rồi bát sạch<br />Đều trên đường rong chơi<br />",
// "<b>Quét tước</b><br />Siêng năng quét đất bụt<br />Cây tuệ nẩy mầm xanh",
// "<b>Tưới cây</b><br />Đừng thấy mình riêng lẻ cây ơi<br />Nước này tuôn chảy từ mạch đất trời<br />Nước này là đại địa<br />Ta có nhau tự muôn đời",
// "<b>Trồng cây</b><br />Tôi gửi tôi nơi đất<br />Đất gửi đất nơi tôi<br /> Tôi gửi tôi nơi Bụt<br /> Bụt gửi Bụt nơi tôi<br />",
// "<b>Thiền hành (5-6)</b><br />Bước trên hành tinh xanh<br />Tôi bước trên hành tinh xanh",

"<b>Bẻ gẫy thế tam giác</b><br />Không than phiền về người khác với người thứ ba.<br />Luôn ý thức rằng mỗi hành động, mỗi lời nói của ta, ai rồi cũng sẽ biết<br />và ta chịu hoàn toàn trách nhiệm về những gì ta đã làm và đã nói.<br /><br />Nói ra một điều gì về một người nào,<br />tốt hơn là ta nên nói thẳng với người đó.<br />Có điều gì nghi ngờ, ta cũng nên hỏi thằng.<br />",
"Hạnh phúc ở trong tầm tay của ta,<br />trong từng phút giây,<br /> trong từng hơi thở, <br />trong từng bước chân.</b>",
"<b>Không bàn về những điều mình chưa từng kinh nghiệm</b><br />Sự vật không thể mô tả được bằng ngôn từ và khái niệm.<br />Sự vật chỉ có thể được tiếp cận bằng kinh nghiệm trực tiếp.<br />Nếu ta bàn về những điều mình chưa từng kinh nghiệm,<br /> thì ta đang lãng phí thì giờ của mình cũng như của người.<br />",
"<b>Giận</b><br /><a href='http://www.quangduc.com/Thien/86anlac2.html#%C3%9D%20Th%E1%BB%A9c%20V%E1%BB%81%20C%C3%A1i%20Gi%E1%BA%ADn'>Thở vào, tôi biết tôi đang giận<br />Thở ra, tôi biết cái giận là tôi<br />Thở vào, tôi biết cái giận làm tôi khó chịu<br />Thở ra, tôi biết cái giận rồi sẽ qua<br />Thở vào, tôi thấy tâm đã tĩnh lặng<br />Thở ra, tôi thấy tôi đủ mạnh để chăm sóc cái giận</a>",
"<b>Giận</b><br /><a href='http://www.langmai.org/PhapMon/html/ThiKe2.htm'>Cái giận làm tôi xấu<br />Biết vậy tôi mỉm cười<br />Quay về thủ hộ ý<br />Từ quán không buông lơi</a>",
"<b>Quán niệm trước khi ăn</b><br />1. Thức ăn này là tặng phẩm của đất trời, của muôn loài và công phu lao tác<br />2. Xin nguyện ăn trong chánh niệm và với lòng biết ơn để xứng đáng thọ nhận thức ăn này<br />3. Xin nhớ nhận diện và chuyển hoá những tật xấu, nhất là tật ăn uống không có chừng mực<br />4. Chỉ xin ăn những thức có tác dụng nuôi dưỡng và ngăn ngừa tật bệnh<br />",
"<b>Nâng bát đầy</b><br />Tay nâng bát cơm đầy<br />Tôi thấy rõ vạn vật<br />Ðang dang tay góp mặt<br />Ðể cùng nuôi dưỡng tôi<br />",
"<b>Lặt rau</b><br />Mặt trời xanh rờn một rổ rau tươi<br />Vạn pháp nương nhau làm nên cuộc đời<br />",
"<b>Chuyển hoá cảm thọ</b><br />1. Nhận diện cảm thọ (nhờ có chánh niệm)<br />2. Trở thành một với cảm thọ<br />3. Làm êm dịu cảm thọ<br />4. Buông bỏ cảm thọ, để cảm thọ trôi đi<br />5. Nhìn sau để thấy rõ nguyên nhân tạo ra cảm thọ<br />",
"Ngồi xuống một cách ngay thẳng,<br />tôi mong cho mọi người ai cũng được ngồi trên tòa giác ngộ,<br />lòng không vướng bận bất cứ một niệm lo âu nào",
"Súc miệng lòng cũng sạch<br />Vũ trụ ngát hương hoa<br />Ba nghiệp thường thanh tịnh<br />Cùng Bụt chơi Tây phương<br />",
"<b>Soi gương</b><br />Chánh niệm là đài gương<br />Gương soi hình tứ đại<br />Đẹp nhất là tình thương<br />Và cái nhìn rộng rãi<br />",
"<b>Ngồi xuống</b><br />Ngồi đây ngồi cội bồ đề<br />Vững thân chánh niệm không hề lãng xao<br />",
"<b>Điều thân</b><br />Trong tư thế bán già<br />Đoá hoa nhân phẩm nở<br />Ưu Đàm Hoa muôn thuở<br />Vẫn toả ngát hương thơm<br />",
"<b>Tê chân đổi cách ngồi</b><br />Khổ thọ và lạc thọ<br />Như mây trời theo gió<br />Hơi thở là dây neo<br /> Thuyền về nơi bến cũ<br />",
"<b>Nâng bát không</b><br />Tay nâng chiếc bát không<br />Tôi biết rằng 'trưa' nay<br />Tôi có đủ may mắn<br />Để có bát cơm đầy<br />",
"<b>Trước khi ăn</b><br />Vạn vật tranh sống<br />Trên quả đất này<br />Nguyện cho tất cả<br />Có bát cơm đầy<br />",
"<b>Rửa bát</b><br />Giẻ rửa bát trong tay<br />Ta nhìn ta mỉm cười<br />Ta làm chi vậy đó<br />Kìa nụ hồng đang tươi",
"Đất đưa ta ra đời<br />Rồi đất ôm ấp ta<br />Sinh diệt trong hơi thở<br />Sinh diệt như hằng sa<br />",
"Bàn tay là của ai<br />Chưa một lần chết<br />Ai ngày qua đã sinh<br />Ai ngày qua đã diệt<br />",
"<b>Hoà hợp</b><br />Thân hòa đồng trú<br />Lợi hòa đồng quân<br />Giới hòa đồng tu<br />Khẩu hòa vô tránh<br />Kiến hòa đồng giải<br />ý hòa đồng duyệt",
"Tự xem mình là những phi hàng gia sống sót trở về được tới trái đất.<br />Ta phải bước thật sung sướng, thật an lạc trên hành tinh thân yêu của chúng ta.",
"Thở vào, con cảm thấy an trong khi thở<br />Thở ra, con cảm thấy lạc trong thế ngồi<br />Thở vào, con cảm thấy an chính là hơi thở<br />Thở ra, con cảm thấy lạc chính là thế ngồi<br /><br />An khi thở<br />Lạc khi ngồi<br />An là thở<br />Lạc là ngồi<br />",
""
];

var left = "<div style='font-size:1.1em; margin-top: -5px;'>";
var right = "</div>";
var max = notes.length - 4;
var e, i, n, elems;

if ( document.width < 800 )
  width('c_3',"0%")('c_1', "55%")('c_2', "42%");

hide("tabs")("btnG")("btnI")("footer_promos")("new_user_demo")("gbar")("guser")("gbarl")("q")("footerwrap");

hide(document.getElementsByClassName("left-controls")[0]);

(e = document.getElementsByClassName("right-controls")[0]) &&
(e.innerHTML = e.innerHTML.replace("mark all as read", "clear"));

elems = document.getElementsByClassName("gbh");
n = elems.length;
for (i=0; i<n; i+=1)
	hide(elems[i]);

document.title = "Free & Happy";


var getRandomIndex = (function (){
  var index, preIndex = null, rand = random( 0, max);
  return function () {
    do {
      index = rand();    
    } while ( index == preIndex )
    preIndex = index;
    console.log( index );
    return index;
  };
})();

var bell = unsafeWindow.document.createElement("div");
document.body.insertBefore( bell, document.body.firstChild );

function ring( bell ) {
	bell.innerHTML = '<embed style="height:0" autostart="true" hidden="true" src="http://www.buddhanet.net/filelib/audio/gong-burmese.wav"/>';	
}

if (e = $('regular_logo')) {
	e = e.parentNode.parentNode;
	e.removeChild(e.firstChild);
	e.setAttribute('align','left');
}

function changeNote() {
  e && (e.innerHTML = left + notes[ getRandomIndex() ] + right);
  ring(bell);
  setTimeout( arguments.callee, 600000);
}

changeNote();

})();
