import { Injectable } from '@angular/core';

@Injectable()
export class PhotoService {
    getData() {
        return [
            {
                itemImageSrc: '/assets/images/home/banner.webp',
                thumbnailImageSrc: '/assets/images/home/banner.webp',
                alt: 'Vonixx Speciale Clean',
                title: 'Vonixx'
            },
            {
                itemImageSrc: '/assets/images/home/banner2.webp',
                thumbnailImageSrc: '/assets/images/home/banner2.webp',
                alt: 'Vonixx Speciale Clean',
                title: 'Vonixx'
            }
        ];
    }

    getImages() {
        return Promise.resolve(this.getData());
    }
};