import { Injectable } from '@angular/core';
import { TreeviewItem } from 'ng2-dropdown-treeview';

export class AppService {
    getBooks(): TreeviewItem[] {
        const childrenCategory = new TreeviewItem({
            text: 'Children', value: 1
        });
        const itCategory = new TreeviewItem({
            text: 'IT', value: 9, children: [
                {
                    text: 'Programming', value: 91 
                },
                {
                    text: 'Networking', value: 92
                }
            ]
        });
        return [childrenCategory, itCategory];
    }
}
