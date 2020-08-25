import React from "react";
import howto1 from './img/howto1.png';
import howto2 from './img/howto2.png';
import howto3 from './img/howto3.png';
import howto4 from './img/howto4.png';
import './style.css';

export const Root = () => {

    return (
        <div class="root">
            <div class="text-center">
                <a href="/twitter/auth" class="btn btn-primary my-5"><i class="fab fa-twitter mr-1"></i>Twitterで登録・ログイン</a>
            </div>
            <div class="row">
                <div class="col-md-4 offset-md-4 text-center">
                    <p>バケツリストを簡単に作れるwebアプリです。
                    死ぬまでやりたい100のことを書くのもよし。
                    日常のToDoリストとして使うのもよし。
                    </p>
                </div>
            </div>
            <div class="row text-center mt-5">
                <h2 class="col-md-4 offset-md-4">使い方</h2>
                <img class="img-fluid col-md-8 offset-md-2 my-4" src={howto1}/>
                <p class="col-md-4 offset-md-4 mb-5">①バケツリスト作成画面からタイトルと項目を入力して作成します。</p>
                <img class="img-fluid col-md-8 offset-md-2 my-4" src={howto2}/>
                <p class="col-md-4 offset-md-4 mb-5">②バケツリスト一覧に作成したバケツリストが表示されます。</p>
                <img class="img-fluid col-md-8 offset-md-2 my-4" src={howto3}/>
                <p class="col-md-4 offset-md-4 mb-5">③バケツリストの名前をクリックすると各項目が表示されます。</p>
                <img class="img-fluid col-md-8 offset-md-2 my-4" src={howto4}/>
                <p class="col-md-4 offset-md-4">④黄色の達成ボタンを押すと表記が達成済みになります。</p>
            </div>
        </div>
    );
};

export default Root;