/*
 The MIT License (MIT)

 Copyright (c) 2017 Stefano Cappa (Ks89)
 Copyright (c) 2016 vimalavinisha

 Permission is hereby granted, free of charge, to any person obtaining a copy
 of this software and associated documentation files (the "Software"), to deal
 in the Software without restriction, including without limitation the rights
 to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 copies of the Software, and to permit persons to whom the Software is
 furnished to do so, subject to the following conditions:

 The above copyright notice and this permission notice shall be included in all
 copies or substantial portions of the Software.

 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 SOFTWARE.
 */

import {Component, OnDestroy} from '@angular/core';

import {Image, Action, ImageModalEvent} from 'angular-modal-gallery';
import {Observable, Subscription} from "rxjs";
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/share';

@Component({
  selector: 'my-app',
  styleUrls: ['./app/main.css'],
  template: `
    <section id="Images">
      <h3>Example of an Observable of images with delay(300)</h3>
      <p> You can directly access "ImageModal" directive with "image-modal" for both listing thumbnails and popup images</p>
      <br>
      <image-modal [modalImages]="images"
                   (isClosed)="onCloseImageModal($event)"
                   (visibleIndex)="onVisibleIndex($event)"
                   (isFirstImage)="onIsFirstImage($event)"
                   (isLastImage)="onIsLastImage($event)"></image-modal>
    </section>
    <section id="Images">
      <h3>Example of an array of images</h3>
      <p> You can directly access "ImageModal" directive with "image-modal" for both listing thumbnails and popup images</p>
      <br>
      <image-modal [modalImages]="imagesArray"
                   (isClosed)="onCloseImageModal($event)"
                   (visibleIndex)="onVisibleIndex($event)"
                   (isFirstImage)="onIsFirstImage($event)"
                   (isLastImage)="onIsLastImage($event)"></image-modal>
    </section>
    <section id="Images2">
      <br>
      <h3>Example with only one image</h3>
      <p> You can show an image gallery with only a single image</p>
      <br>
      <image-modal [modalImages]="singleImage"
                   (isClosed)="onCloseImageModal($event)"
                   (visibleIndex)="onVisibleIndex($event)"
                   (isFirstImage)="onIsFirstImage($event)"
                   (isLastImage)="onIsLastImage($event)"></image-modal>
    </section>

    <section id="Images3">
      <br>
      <h3>Example with thumbnail pointers</h3>
      <p> You can list images and then calling "image-modal" directive to show images on popup only</p>
      <br>
      <div *ngFor="let img of images | async; let i = index">
        <div class="float-left" *ngIf="i <= 2">
          <a class="more" *ngIf="i==2" (click)="openImageModal(img)"> +{{images.length - 3}} more </a>
          <img class="list-img" src="{{img.thumb}}" (click)="openImageModal(img.img)" alt='Image'/>
        </div>
      </div>
      <div *ngIf="openModalWindow">
        <image-modal [modalImages]="images" [imagePointer]="imagePointer"
                     (isClosed)="onCloseImageModal($event)"
                     (visibleIndex)="onVisibleIndex($event)"
                     (isFirstImage)="onIsFirstImage($event)"
                     (isLastImage)="onIsLastImage($event)"></image-modal>
      </div>
    </section>
  `
})
export class AppComponent implements OnDestroy {

  openModalWindow: boolean = false;
  imagePointer: number;

  private subscription: Subscription;

  imagesArray = [
    new Image(
      './app/assets/images/gallery/thumbs/img1.jpg',
      './app/assets/images/gallery/img1.jpg',
      'Image 1'
    ),
    new Image(
      './app/assets/images/gallery/thumbs/img2.jpg',
      './app/assets/images/gallery/img2.jpg',
      'Image 2'
    ),
    new Image(
      './app/assets/images/gallery/thumbs/img3.jpg',
      './app/assets/images/gallery/img3.jpg',
      'Image 3'
    ),
    new Image(
      './app/assets/images/gallery/thumbs/img4.jpg',
      './app/assets/images/gallery/img4.jpg',
      'Image 4'
    ),
    new Image(
      './app/assets/images/gallery/thumbs/img5.jpg',
      './app/assets/images/gallery/img5.jpg',
      'Image 5'
    )
  ];
  images: Observable<Array<Image>> = Observable.of(this.imagesArray).delay(300).share();

  singleImage: Observable<Array<Image>> = Observable.of([
    new Image(
      './app/assets/images/gallery/thumbs/img1.jpg',
      './app/assets/images/gallery/img1.jpg',
      'Image 1'
    )]); // array with a single image inside (the first one)

  openImageModal(image: Image) {
   // let imageModalPointer: number = 1;
    // for (let i = 0; i < images.length; i++) {
    //   if (imageSrc === images[i].img) {
    //     imageModalPointer = i;
    //     break;
    //   }
    // }
    console.log("openImageModal before imagepointer: " + this.imagePointer);
    this.images.subscribe((val: Image[]) => {
      for(let i=0; i<val.length; i++) {
        if(val[i].img === image.img) {
          this.imagePointer = i;
          console.log("indice: " + i);
          break;
        }
      }
      this.openModalWindow = true;
      console.log("openImageModal inside imagepointer: " + this.imagePointer);
      //return val;
    });

    // console.log("openImageModal after imagepointer: " + this.imagePointer);
    //this.images = images;
    // this.imagePointer = imageModalPointer;
  }

  onVisibleIndex(event: ImageModalEvent) {
    console.log("action: " + Action[event.action]);
    console.log("result:" + event.result);
  }

  onIsFirstImage(event: ImageModalEvent) {
    console.log("onfirst action: " + Action[event.action]);
    console.log("onfirst result:" + event.result);
  }

  onIsLastImage(event: ImageModalEvent) {
    console.log("onlast action: " + Action[event.action]);
    console.log("onlast result:" + event.result);
  }

  onCloseImageModal(event: ImageModalEvent) {
    console.log("onClose action: " + Action[event.action]);
    console.log("onClose result:" + event.result);
    this.openModalWindow = false;
  }

  ngOnDestroy() {
    if(this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
