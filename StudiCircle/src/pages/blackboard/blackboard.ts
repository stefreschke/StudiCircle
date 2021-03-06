import {Component} from '@angular/core';
import {AlertController, NavController, NavParams} from 'ionic-angular';
import {DbProvider} from "../../providers/dbprovider/dbprovider";
import {BlackboardPost} from "../../providers/declarations/BlackboardPost";
import {BlackboardPostPage} from "../blackboard-post/blackboard-post";
import {Subscription} from "rxjs/Subscription";
import {CircleProvider} from "../../providers/circle-provider/CircleProvider";
import {ApiProvider} from '../../providers/api/api';
import {UserInfo} from '../../providers/declarations/UserInfo';

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
  private isAdminOrMod: boolean = false;
  public currentUserID: number;
  public memberList: UserInfo[];


  constructor(public navCtrl: NavController, public navParams: NavParams, public apiProvider: ApiProvider, private alertCtrl: AlertController, private circleProvider: CircleProvider, private dbProvider: DbProvider) {
    this.currentUserID = Number(this.apiProvider.getCurrentUser().id);
  }

  ionViewDidLoad() {
    this.getAllPostsOfBlackboard();
    console.log(this.currentUserID);
    this.circleProvider.getUserRole(this.circleId).subscribe(
      role => {
        if (role.role == "admin") {
          this.isAdminOrMod = true;
        } else if (role.role == "mod") {
          this.isAdminOrMod = true;
        }
      });
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
          if (title.length < 1) return;

          const text = data.text.toString().trim();


          this.insertPost(title, text);
        }
      }]
    }).present();
  }

  private insertPost(title: string, text: string) {
    //console.log('new post', title, text);
    this.circleProvider.insertPost(this.circleId, title, text).subscribe(post => {
      //console.log('post', post);
      this.getAllPostsOfBlackboard();
    });
  }

  private showPost(post: BlackboardPost) {
    this.navCtrl.push(BlackboardPostPage, {
      post: post
    });
  }

  deletePost(post: BlackboardPost) {
    console.log('deletePost', post);
    let alert = this.alertCtrl.create({
      title: 'Post wirklich löschen?',
      message: 'Möchten Sie den Post wirklich aus dem Blackboard entfernen?',
      buttons: [

        {

          text: 'Entfernen',
          handler: () => {
            this.circleProvider.deletePostPro(post).subscribe(
              message => {
                console.log(message);
              }
            );

            this.reloadPosts();
          }

        },
        {
          text: 'Abbrechen',
          role: 'cancel',
          handler: () => {
            console.log('Post löschen abgebrochen');
          }
        }
      ]
    });
    alert.present();
  }

  reloadPosts() {
    this.posts = [];
     return this.circleProvider.getBlackboardPosts(this.circleId).subscribe(posts => {
      this.posts = posts;
    })

  }

  private getAllPostsOfBlackboard() {
    this.circleProvider.getBlackboardPosts(this.circleId).subscribe(posts => {
      //console.log('getBlackboardPosts', posts);
      this.posts = posts;
    });

  }
}
