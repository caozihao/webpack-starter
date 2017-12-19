import './components/index/styles/index.css';
import imrSrc from "./components/index/images/index.jpg";
import print from "./components/index/js/print";


function component() {

  // 判定环境
  if (process.env.NODE_ENV === 'production') {
    console.log('production');
  } else {
    console.log('development');
  }


  var element = document.createElement('div');
  print();
  // Lodash（目前通过一个 script 脚本引入）对于执行这一行是必需的
  element.innerHTML = "Hello Webpack";
  element.classList.add('hello');

  var myImg = new Image();
  myImg.src = imrSrc;
  element.appendChild(myImg);
  return element;
}

document.body.appendChild(component());