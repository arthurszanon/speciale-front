import { Injectable } from '@angular/core';

@Injectable()
export class PhotoService {
    getData() {
        return [
            {
                itemImageSrc: '/assets/images/home/1.jpg',
                thumbnailImageSrc: '/assets/images/home/1.jpg',
                alt: 'Vonixx Speciale Clean',
                title: 'Vonixx'
            },
            {
                itemImageSrc: '/assets/images/home/2.jpg',
                thumbnailImageSrc: '/assets/images/home/2.jpg',
                alt: 'Vonixx Speciale Clean',
                title: 'Vonixx'
            },
            {
                itemImageSrc: '/assets/images/home/2.jpg',
                thumbnailImageSrc: '/assets/images/home/3.jpg',
                alt: 'Vonixx Speciale Clean',
                title: 'Vonixx'
            }
        ];
    }

    getImages() {
        return Promise.resolve(this.getData());
    }
};