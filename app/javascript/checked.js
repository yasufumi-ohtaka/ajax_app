function check() {
  const posts = document.querySelectorAll(".post");
  posts.forEach(function (post) {
    //二回目の処理の際、以下のif文により、重複したイベント発火を回避
    if (post.getAttribute("data-load") != null) {
      return null;
    }
    post.setAttribute("data-load", "true");
    post.addEventListener("click", () => {
      const postId = post.getAttribute("data-id");
      const XHR = new XMLHttpRequest();
      XHR.open("GET", `/posts/${postId}`, true);
      XHR.responseType = "json";
      XHR.send();
// onloadは、レスポンスが成功した場合に呼び出されるイベントハンドラー。
//XMLHttpRequestで定義されるプロパティ. 
// 下の条件分岐は、statusが200以外だったらアラートが表示されるという話。
      XHR.onload = () => { 
        if (XHR.status != 200) { 
          alert(`Error ${XHR.status}: ${XHR.statusText}`);
          return null;          
        }
        //エラーの際、上のreturnで、これ以降のJavaSの処理は行われず終了となる
        const item = XHR.response.post;
        if (item.checked === true) {
          post.setAttribute("data-check", "true");
        } else if (item.checked === false) {
          post.removeAttribute("data-check");
        }
      };
    });
  });
}
setInterval(check, 1000);
//↑ここをwindow.addEventListener("load", check);のままにしていたら、
//ページを読み込むごとにcheckが実行される。
//それでは非同期通信が出来ないから、setIntervalに変更した。