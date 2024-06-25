import { Injectable } from '@angular/core';

@Injectable()
export class EmpresasService {
    getData() {
        return [
            {
                image: '/assets/images/home/e1.png',
                alt: 'Vonixx Speciale Clean',
                title: 'Vonixx'
            },
            {
                image: '/assets/images/home/e2.png',
                alt: 'Vonixx Speciale Clean',
                title: 'Vonixx'
            },
            {
              image: '/assets/images/home/e3.png',
              alt: 'Vonixx Speciale Clean',
              title: 'Vonixx'
                },
                {
                  image: '/assets/images/home/e1.png',
                  alt: 'Vonixx Speciale Clean',
                  title: 'Vonixx'
                },
                {
                image: '/assets/images/home/e2.png',
                alt: 'Vonixx Speciale Clean',
                title: 'Vonixx'
              },
                {
              image: '/assets/images/home/e3.png',
              alt: 'Vonixx Speciale Clean',
              title: 'Vonixx'
                },
                {
                  image: '/assets/images/home/e1.png',
                  alt: 'Vonixx Speciale Clean',
                  title: 'Vonixx'
              },
              {
                  image: '/assets/images/home/e2.png',
                  alt: 'Vonixx Speciale Clean',
                  title: 'Vonixx'
              },
              {
                image: '/assets/images/home/e3.png',
                alt: 'Vonixx Speciale Clean',
                title: 'Vonixx'
                  },
            {
                image: '/assets/images/home/e1.png',
                alt: 'Vonixx Speciale Clean',
                title: 'Vonixx'
            }
        ];
    }

    getEmpresa() {
        return Promise.resolve(this.getData());
    }
};