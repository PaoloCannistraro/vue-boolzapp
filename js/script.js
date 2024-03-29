const app = new Vue({
    el: "#app",
    data: {
        contacts: [{
                id: 1,
                name: 'Michele',
                avatar: '_1',
                visible: true,
                messages: [{
                        date: '10/01/2020 15:30:55',
                        message: 'Hai portato a spasso il cane?',
                        status: 'sent'
                    },
                    {
                        date: '10/01/2020 15:50:00',
                        message: 'Ricordati di stendere i panni',
                        status: 'sent'
                    },
                    {
                        date: '10/01/2020 16:15:22',
                        message: 'Tutto fatto!',
                        status: 'received'
                    }
                ],
            },
            {
                id: 2,
                name: 'Fabio',
                avatar: '_2',
                visible: true,
                messages: [{
                        date: '20/03/2020 16:30:00',
                        message: 'Ciao come stai?',
                        status: 'sent'
                    },
                    {
                        date: '20/03/2020 16:30:55',
                        message: 'Bene grazie! Stasera ci vediamo?',
                        status: 'received'
                    },
                    {
                        date: '20/03/2020 16:35:00',
                        message: 'Mi piacerebbe ma devo andare a fare la spesa.',
                        status: 'sent'
                    }
                ],
            },
            {
                id: 3,
                name: 'Samuele',
                avatar: '_3',
                visible: true,
                messages: [{
                        date: '28/03/2020 10:10:40',
                        message: 'La Marianna va in campagna',
                        status: 'received'
                    },
                    {
                        date: '28/03/2020 10:20:10',
                        message: 'Sicuro di non aver sbagliato chat?',
                        status: 'sent'
                    },
                    {
                        date: '28/03/2020 16:15:22',
                        message: 'Ah scusa!',
                        status: 'received'
                    }
                ],
            },
            {
                id: 4,
                name: 'Alessandro B.',
                avatar: '_4',
                visible: true,
                messages: [{
                        date: '10/01/2020 15:30:55',
                        message: 'Lo sai che ha aperto una nuova pizzeria?',
                        status: 'sent'
                    },
                    {
                        date: '10/01/2020 15:50:00',
                        message: 'Si, ma preferirei andare al cinema',
                        status: 'received'
                    }
                ],
            },
            {
                id: 5,
                name: 'Alessandro L.',
                avatar: '_5',
                visible: true,
                messages: [{
                        date: '10/01/2020 15:30:55',
                        message: 'Ricordati di chiamare la nonna',
                        status: 'sent'
                    },
                    {
                        date: '10/01/2020 15:50:00',
                        message: 'Va bene, stasera la sento',
                        status: 'received'
                    }
                ],
            },
            {
                id: 6,
                name: 'Claudia',
                avatar: '_6',
                visible: true,
                messages: [{
                        date: '10/01/2020 15:30:55',
                        message: 'Ciao Claudia, hai novità?',
                        status: 'sent'
                    },
                    {
                        date: '10/01/2020 15:50:00',
                        message: 'Non ancora',
                        status: 'received'
                    },
                    {
                        date: '10/01/2020 15:51:00',
                        message: 'Nessuna nuova, buona nuova',
                        status: 'sent'
                    }
                ],
            },
            {
                id: 7,
                name: 'Federico',
                avatar: '_7',
                visible: true,
                messages: [{
                        date: '10/01/2020 15:30:55',
                        message: 'Fai gli auguri a Martina che è il suo compleanno!',
                        status: 'sent'
                    },
                    {
                        date: '10/01/2020 15:50:00',
                        message: 'Grazie per avermelo ricordato, le scrivo subito!',
                        status: 'received'
                    }
                ],
            },
            {
                id: 8,
                name: 'Davide',
                avatar: '_8',
                visible: true,
                messages: [{
                        date: '10/01/2020 15:30:55',
                        message: 'Ciao, andiamo a mangiare la pizza stasera?',
                        status: 'received'
                    },
                    {
                        date: '10/01/2020 15:50:00',
                        message: 'No, l\'ho già mangiata ieri, ordiniamo sushi!',
                        status: 'sent'
                    },
                    {
                        date: '10/01/2020 15:51:00',
                        message: 'OK!!',
                        status: 'received'
                    }
                ],
            }
        ],
        currentIndex: 0,
        currentId: 1,
        filtro: '',
        message: '',
        filteredContacts: [],
        randomReplies: ['Ciao!', 'Come stai?', 'Facciamo un giro in macchina!', 'Come butta?', 'Ti và di mangiare la pizza?', 'Hello world!', 'Io ti conosco: Sei tu!', 'Perchè scrivi cose a caso?']
    },

    methods: {
        filtra() {
            this.filteredContacts = this.contacts.filter((item) => {
                return item.name.toLowerCase().includes(this.filtro.toLowerCase());
            })
        },
        changeActive(id) {
            this.currentId = id;
            const index = this.contacts.findIndex((el) => {
                return el.id === id
            })
            this.currentIndex = index;
        },
        sendMessage() {
            if (this.message == '') return;
            const newMessage = {
                date: 'Oggi ' + dayjs().format('HH:mm'),
                message: this.message,
                status: 'sent'
            };
            const replyMessage = {
                date: 'Oggi ' + dayjs().format('HH:mm'),
                message: this.randomReplies[Math.floor(Math.random() * this.randomReplies.length)],
                status: 'received'
            }
            this.contacts[this.currentIndex].messages.push(newMessage);
            this.message = '';
            setTimeout(() => {
                this.contacts[this.currentIndex].messages.push(replyMessage);
            }, 3000);
        },
        eraseMessage(index, currentIndex) {
            if (this.contacts[currentIndex].messages.length > 0) {
                this.contacts[currentIndex].messages.splice(index, 1);
            } else return;
        },
        noDate(contact) {
            const noDate = contact.messages.length > 0 ? contact.messages.at(-1).date : ''
            return noDate
        },
        noMessage(contact) {
            const noMessage = contact.messages.length > 0 ? contact.messages.at(-1).message : 'NESSUN MESSAGGIO';
            return noMessage
        },
        showChatMobile(){
            this.contacts[this.currentIndex].visible = !this.contacts[this.currentIndex].visible
        },

    },
    computed: {},
    mounted() {
        this.filtra()
    },
});