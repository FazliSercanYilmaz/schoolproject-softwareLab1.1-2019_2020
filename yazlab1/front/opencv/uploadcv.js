let gonderbutton = document.getElementById("gonderbutton");
let imgElement = document.getElementById('imageSrc');
let kapakelement = document.getElementById('kapaksrc');
let inputElement = document.getElementById('kitap_isbn');
let kapakinput = document.getElementById('kitap_kapak');
let canvascv = document.getElementById('canvasOutput');
kapakinput.addEventListener('change', (e) => {
kapakelement.src = URL.createObjectURL(e.target.files[0]);
  }, false);
inputElement.addEventListener('change', (e) => {
imgElement.src = URL.createObjectURL(e.target.files[0]);
}, false);
imgElement.onload = function() {
let image1 = cv.imread(imgElement);
cv.cvtColor(image1, image1, cv.COLOR_RGBA2GRAY, 0);
let image2 = new cv.Mat();
let filtered = new cv.Mat();
 let opening = new cv.Mat();
 let closing = new cv.Mat();
 let or_image = new cv.Mat();
 let temp_size2 = new cv.Size(1,1);
 kernel = new cv.Mat();
 image1.convertTo(image2, cv.CV_8UC1);
   cv.adaptiveThreshold(image2,filtered, 255, cv.ADAPTIVE_THRESH_MEAN_C, cv.THRESH_BINARY,41 , 9);
kernel = cv.Mat.ones(temp_size2, cv.CV_8UC1);
 cv.morphologyEx(filtered, opening, cv.MORPH_OPEN, kernel);
  cv.morphologyEx(opening, closing, cv.MORPH_CLOSE, kernel); 
  image1= image_smoothening(image1);
  cv.bitwise_or(image1,closing,or_image);
    cv.imshow('canvasOutput', or_image);
    console.log(canvascv.toDataURL());
  image1.delete();
  image2.delete();
  filtered.delete();
  opening.delete();
  closing.delete();
  or_image.delete();
  kernel.delete();
};
kapakelement.onload = function(){
let a = cv.imread(kapakelement);
cv.imshow("canvaskapak",a);
a.delete();
}
function image_smoothening(img){
    let  birinci_asama = new cv.Mat();
    let ikinci_asama = new cv.Mat();
    let ucuncu_asama = new cv.Mat();
    let blur = new cv.Mat();
    let temp_size = new cv.Size(1,1);
    cv.threshold(img, birinci_asama, 120, 255, cv.THRESH_BINARY);
    img.delete();
    cv.threshold(birinci_asama, ikinci_asama,  0	, 255,  cv.THRESH_BINARY  + cv.THRESH_OTSU);
    birinci_asama.delete();
    cv.GaussianBlur(ikinci_asama, blur, temp_size, 0);
    ikinci_asama.delete();
    cv.threshold(blur, ucuncu_asama,0,255,cv.THRESH_BINARY + cv.THRESH_OTSU);
    blur.delete();
    return ucuncu_asama;
};
function onOpenCvReady() {
    document.getElementsByTagName("body")[0].style.visibility = "visible";
  }
gonderbutton.onclick = function(){
    let isbn = document.getElementById("canvaskapak").toDataURL()
    isbn = isbn.replace(/^data\:image\/\w+\;base64\,/, '');
    document.getElementById("frontimage").value = isbn;
    isbn = document.getElementById("canvasOutput").toDataURL()
    isbn = isbn.replace(/^data\:image\/\w+\;base64\,/, '');
    document.getElementById("isbnimage").value = isbn;
    document.getElementById("formgonder").submit();
};
