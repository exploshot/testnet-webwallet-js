/**
 *     Copyright (c) 2019, ExploShot
 *     Copyright (c) 2019, The Qwertycoin Project
 * 
 *     All rights reserved.
 *     Redistribution and use in source and binary forms, with or without modification,
 *     are permitted provided that the following conditions are met:
 * 
 *     ==> Redistributions of source code must retain the above copyright notice,
 *         this list of conditions and the following disclaimer.
 *     ==> Redistributions in binary form must reproduce the above copyright notice,
 *         this list of conditions and the following disclaimer in the documentation
 *         and/or other materials provided with the distribution.
 *     ==> Neither the name of Qwertycoin nor the names of its contributors
 *         may be used to endorse or promote products derived from this software
 *          without specific prior written permission.
 * 
 *     THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS
 *     "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT
 *     LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR
 *     A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR
 *     CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL,
 *     EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO,
 *     PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR
 *     PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
 *     LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
 *     NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
 *     SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */

/**
 *  Contacts: 
 *  "Contacts": [
 *      {"ExploShot": "QWC1Nsegh9NRyaSH7A1hch59VpvsjjwZwGRFvEUXFbs9QMj145gXJQDbdcR5r6rTQPX6hPy1ij5SCTr2SFkrnuNBAH1Gh2EshP"}
 *  ]
 */


import {
    AppState
} from "../model/AppState";
import {
    DestructableView
} from "../lib/numbersLab/DestructableView";
import {
    DependencyInjectorInstance
} from "../lib/numbersLab/DependencyInjector";
import {
    Wallet
} from "../model/Wallet";
import {
    Constants
} from "../model/Constants";
import {
    Storage
} from './../model/Storage';
import {
    VueVar
} from "../lib/numbersLab/VueAnnotate";

let wallet: Wallet = DependencyInjectorInstance().getInstance(Wallet.name, 'default', false);
let blockchainExplorer = DependencyInjectorInstance().getInstance(Constants.BLOCKCHAIN_EXPLORER);

class ContactPageView extends DestructableView {
    @VueVar([]) contacts!: any[];

    contactName!: string;
    contactAddress!: string;

    constructor(container: string) {
        super(container);
        AppState.enableLeftMenu();
        this.getContacts();
    }

    hasOneStored(): Promise < boolean > {
        return Storage.getItem('qwcContacts').then((contacts: any) => {
            return JSON.parse(contacts).length !== 0;
        });
    }

    getContacts() {
        if (this.hasOneStored()) {
            return Storage.getItem('qwcContacts').then((contacts: any) => {
                this.contacts = JSON.parse(contacts);
                /*
                swal({
                    type: 'success',
                    title: `loaded all ${this.contacts.length} contacts`,
                    confirmButtonText: i18n.t('changeWalletPasswordPage.modalSuccess.confirmText'),
                });
                */
            });
        } else {
            this.contacts = [];
        }
    }

    contactDetails(contact: any) {
        swal({
            title: i18n.t('contactPage.contactDetailsBlock.title'),
            html: `
            <div class="tl">
                <div class="swal2-p">
                    ${i18n.t('contactPage.contactDetailsBlock.address')}: <a class="swal2-a" href="#send?address=${contact.Address}">${i18n.t('contactPage.contactDetailsBlock.sendTo')}${contact.Name}</a>
                </div>
            </div>
            `
        });
    }
}

if (wallet !== null && blockchainExplorer !== null)
    new ContactPageView('#app');
else
    window.location.href = '#index';