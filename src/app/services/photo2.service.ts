import { Injectable } from '@angular/core';

@Injectable()
export class Photo2Service {
    getData() {
        return [
            {
                itemImageSrc: '/assets/images/home/4.jpg',
                thumbnailImageSrc: '/assets/images/home/4.jpg',
                alt: 'Vonixx Speciale Clean',
                title: 'Vonixx'
            },
            {
                itemImageSrc: '/assets/images/home/5.jpg',
                thumbnailImageSrc: '/assets/images/home/5.jpg',
                alt: 'Vonixx Speciale Clean',
                title: 'Vonixx'
            },
            {
                itemImageSrc: '/assets/images/home/6.jpg',
                thumbnailImageSrc: '/assets/images/home/6.jpg',
                alt: 'Vonixx Speciale Clean',
                title: 'Vonixx'
            }
        ];
    }

    getImages() {
        return Promise.resolve(this.getData());
    }
};