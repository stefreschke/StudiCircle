import {Component} from '@angular/core';
import {AlertController, NavController, NavParams} from 'ionic-angular';
import {DbProvider} from "../../providers/dbprovider/dbprovider";
import {BlackboardPost} from "../../providers/declarations/BlackboardPost";
import {BlackboardPostPage} from "../blackboard-post/blackboard-post";
import {Subscription} from "rxjs/Subscription";
import {CircleProvider} from "../../providers/circle-provider/CircleProvider";

/**
 * Generated class for the BlackboardPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-blackboard',
  templateUrl: 'blackboard.html',
})
export class BlackboardPage {

  private circleId = this.navParams.get('circleId');
  private posts = new Array<BlackboardPost>();
  private date = new Date();
  private userName = 'Hans Solo';

  constructor(public navCtrl: NavController, public navParams: NavParams, private alertCtrl: AlertController, private circleProvider: CircleProvider, private dbProvider: DbProvider) {
  }

  ionViewDidLoad() {
    this.getAllPostsOfBlackboard();
  }

    //get the first 3 comments of every post

  /*private showPost(post: any) {
    console.log(this.posts[post].userName);
    this.navCtrl.push(BlackboardPostPage, { post: this.posts[post] });
  }*/

  private addPost() {
    this.alertCtrl.create({
      title: 'Enter Text',
      inputs: [{
        name: 'title',
        placeholder: 'title'
      }, {
        name: 'text',
        placeholder: 'Type here ...'
      }],
      buttons: [{
        text: 'OK',
        handler: data => {
          const title = data.title.toString().trim();
          if(title.length < 5) return;

          const text = data.text.toString().trim();
          if (text.length < 10) return;

          this.insertPost(title, text);
        }
      }]
    }).present();
  }

  private insertPost(title: string, text: string) {
    console.log('new post', title, text);
    this.circleProvider.insertPost(this.circleId, title, text).subscribe(post => {
      console.log('post', post);
      this.posts.push(post);
    });
  }

  private showPost(post: BlackboardPost) {
    console.log(post);
    this.navCtrl.push(BlackboardPostPage, {
        post: post
      });
  }

  private deletePost(post: BlackboardPost) {
    console.log('deletePost', post);
    this.circleProvider.deletePost(post).subscribe(console.log);
  }

  private getAllPostsOfBlackboard(){
      this.circleProvider.getBlackboardPosts(this.circleId).subscribe(posts => {
        console.log('getBlackboardPosts', posts);
        this.posts = posts;
      });
    }
}
