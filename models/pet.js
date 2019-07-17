const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PetSchema = new Schema({
  userId: {
    type: String,
    required: true
  },
  main: {
    type: Boolean,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  diet: {
    type: String,
    required: true
  },
  stats: {
    type: Object,
    required: true,
    default: ""
  },
  status: {
    type: Object,
    default: { happiness: 90, energy: 90, hunger: 75 }
  },
  abilities: {
    type: Array,
    default: [
      {
        name: "Flail",
        type: "attack",
        damage: 3,
        manaCost: 1,
        manaType: "colorless",
        cooldown: 0,
        image: "/static/media/flail.c3ad8329.png",
        tooltip: "A desperate attack that is both cheap and weak"
      }
    ]
  },

  availableAbilities: {
    type: Array,
    default: [
      {
        name: "Bite",
        type: "attack",
        damage: 12,
        manaCost: 3,
        manaType: "colorless",
        cooldown: 0,
        image:
          "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAgVBMVEUAAAD////8/PzY2NjJycnr6+v5+fkwMDC4uLjU1NTe3t7Dw8P19fXl5eXp6enPz8+kpKSIiIivr69VVVVsbGwMDAx3d3ecnJxGRkaBgYG7u7tra2uqqqpQUFA9PT1gYGAaGhoiIiKfn5+QkJCLi4ssLCxDQ0M1NTUWFhYlJSVMTEy23aTjAAAMkklEQVR4nO1d6WLjKAyu2ybttOkx6X0mmavTvv8D7iaxjZA+CXzgOLt8P40ByYAuBD44yMjIyMjIyMjIyMjIyMjIyMjIyMjI+L/jY7lrChpg+dGwwu3z5bQoZue3ScjpG/fHs6KYXj7HU/vjsKgwe0pIWT/4Oa2pPfwRVWMxKyguvxJT2A03E4/a2SJc5aHguE5PZ2vMBbU/Q1V+iipF8W0IWlvhDFD7y67yAqoUxdkw9DbF3QRSa07Uu0NYp7gYiuhGwAwWU6vOM65TFFfsxcXz1fn1TULqfdxcn18987FBU3SDU72hP1qdonj1XnzaPpy9/u6fG4GPeakPfH13rhOrq3+jUkEH7MQ9Pm9qTDTF+7HrbEme3xu0qoO4NCoVM/LiFS2Yp+Jtg1Pa1bl7fmfRWtwprSFN4eDshRO/IEbLtsTt1O9qWZecFhY0S+zCrOU+zA9e8goae7yeX9/+jeJjefvvu39AgWDjoSr5sElVNLg98KT5o4gWy2XyLWwN35bNyZkghWXdjz2ERYG7egrUqlfiTJZxm+CzLpncm/zdO6XGB/zSICFAavECOwt9l+Jt+x4USIxFKpUv3lT+bigXTAICBuuVYgnSDdC6MTQoq/YJCz36lkYZATMwPAl4XCCs5AeE4BbKFtNQtXKcfuNSuo5+sbIJsgw+uNVFJaAySmU7YJ34gJZbQDy5angMPdtVDoCcqQvxzjMpVXj4tL4xxQpwKHsUONm8+FcpfXRtgTXEjVjgxVyEidlKo5swqchv/x6u9mh+3wfXFprwj15viEhiNgmV670RFDTchjUbpVioI7QGMd8M6kogN+3QFSty/SKaQ+Tqy4CAQKllFEkW4NCT4JiDIDHlSr0Nk4pCL0EJXK8lxX4lgS4sll35CpYTAahMqDJCESEykD/wLVztffumstCJHYG9b2fd4DU/cQ0oo1TKD8OPrUDckBrS2uSo1wkuJm1h48FN01dYfkRaMLsIWdAFVvlhDi+rV69QKbW+8TKbB8qp6QO/0XFVqsg6Avq14jmsR56bLBtQCxuvVLf68Rh+Jy1AN6A2esIyox2HdSRyBQo9ZfAG6zurDK9DT0sjYVUbrvATe2jH4Y31rh+IhVHJ97r4HRUfei3I2DtZW2Gjph2H7l05h3x9DlcqEZVQ2B77TchBJOugFYdBbUEpFIXMQ0fTkFh1B9egnAVXhMKgY6wEgx2QLMUOmVKJh46fWWPIOqflyIvmATJOELWJoDSnQPow6OLTHh79oploTc4I38qQvcmvzubpCSnCwpgAOd3BSt4s8letDJTJleqXS6Ut4zm+PPGWadARQnYpEF4+PCfWc+9QsInX5iFMrjIPQRueUvB0SVCYPoDm7Hhwwd1mstZh2IdNQynbmNUSasQPdQW9/O+gtZBLwkIfzkdDi1qoPBkbZkTiPR63nJmwVrYBa6BwIrZDHHhItBpEpHnW8FYq6tDzY3FwzMXhee+B+DyMYkA7g4Ap5IpAjUHPiUOrwpdtaj5EaWTzME9It52AprT93wpioWw+o7HH7z4znsdUq6nfqWxGDHFAtyG5FQxCirV7g3omqMWtTn4tbazt5PVLYpcyIBelgl4jMLWlSjgWpgxs0MpzmIS+wRpXICYR2GTBDQamttTqH4FMm0WQwSqdQt/Z2GAuJXFALuJ1EQi2afuqBo5CDB5sR5ELsQisbGJx+lfAEmpOxdp6tRbqFmdY8IVgE4s3ge0Y3QTWCeDZXqhbfMNbYQHYchErH20/YouxJQ3ZwSilkqkQbXE3PMzdTqwsApVi5tuQMCW/NhxqztcaadNmmsM0ajRiTQ9xbFmmpsOOfKc1TGEaSNscHOZwaBaE6VbaSSPDwzTb1FpWrkK61K52sBx2XXdbMbrhkknjYC0pzVvDcdoKKO9sl7BiUXo2uzXynwNSHwNrl1Sfb1aC6YDER8ESi0Y1YztgMNIjYewDWya0YQoNRnosdFKNTHZDjeLQzi6hc2id1dIFlGat7w46h++tql1atXYC1TwxT5ToDtT4DgapUtGO+qgW+9gcYMPJt0+v4ZNdxRjPr6nT7dGspmqZcMxsaGgc2stQrzc+DrXckRCl2kJsEbRNDC13JHSIVHNKxseh5uoFnaB95zC0DNXpvTcc6t5vBcU0DVccGgqH4QsEvvaFQ8UPijjVirc89oXDGPsZZ6fuC4cxoXkciByfpMEcRoUE95rDqKp2EvloADmMIxPqiz3hMO6ymUdUdU84RIfyACKSsEcAxGFsJAJtPo6PQ2TT4Pw5CeRfjM8/RBxGp62AlIW94DA+IwaYNePjEHjA8TvxYA9qfJEo4ObZMSgPsvL4oonSMGmStiWn6fgiwjJZtEn2mDxKPLakLxQRbjBJwTQd376F8GOb5RYKg2F8e09iZ6ZZTpOQpuEQ1tAQ06xhLoVQ+mnI7ICu60hk8SWhsgs4gbE2aQVhmyahsgs4gY3TYbioSkFkF/DMmOYmCd+iWfZOYzewK9UivXsKfgyqTT59SvBIRIsmmFXUyGAYACxtpE08l53qH3luYpvk0LvuTaSEn3HQ6jQIs9zwHW+7g+8cxF0CzeHPAy0LOrHz/6mFwPwzTMt2rXsqUUl//x6zndUBb9qn9eLWbT+z14hiFKVeoC9azqCnr9veHb+ijWAH+jV1Ev8v7dvSs4TtXTsqa/DG3GFzi7cZ5hr91DVoJ2fWoFoVnntan8a18lW7Y/2RoUFGw6UtDn9WIDsYcDFPOqzyOKwtKxgFI6G2LjsOxK5B3WwO47ZTtrHYyHN03zQxKjuZW87VR8G2zWpPmh+9UtfZxKQsHk4mo6HaKsyUXsdWEqAAhQtEdRPmK0sil4IopT1XWi4gc9sirBGcwpBlpUoK/lGiA8o5JDWS8wu6aiuXIiVFcmnVpUy1udLEnHPxO/dRb/GI5VZFAVIG/Ct5Ii5VqO9UaHXU3UPtYYhzmfXlG5370KFKk9p56qDtK5xpndRWRboARz1SwnCqMrf6OIBdOdPCdqrldTrbu3YCha6qJtCyj24usMh0wa50B9ldVsiSlcyVsW2FBV7S7g6cdPvDzvjk86Tcw43MEIrrhysFpynT7UvVXYh5cgW/eltsbRduwZMYR6o/sZCoL58n26/eW0+bD8a0Lr17PtXP2chlUNy+nyLR0B6bK/eZ/UcjcamcYJowwfY/105Pn37bD/kV6Y3bqTb5abDPnyer9aNeY2DrvnzLyYsXL/vsq4b3twZfqDwCwdANN2KeeBs3af4E6WWc+0lZi/497zkPFtDeE+l8b6fdX3T3CdzSM3+g/N94pHEv/G1or+ihN1VIMPVcTZaOEvdjp2ZgP03xvLfTFE7pyjOc2OVuKTQiuxrRm0ID3JbDLuhLkSTNEki1m5FSgWUvJjBN+ZHkoS+q4vmr/e9A8fzIoa9T4+k2/RtuPHlw6NMCnMP+pynrYPAcXpHZ1/c0FUm8A+d/ytuI+lZQIhV/YA55zlXRd0xR/vps4AxX8JO2fvWVPEA3MIdgDPt1EsFp5B5ivw2A/p/XZ14YumNl2WP7YaB7z8R29yLWDHkQl+Kiew+GHUN4ywvbu/mMDRX9FHIS3WU99F1c6JYmpjDW+0YxPsDalWfBQjSEQ58WgPcSeFu1W9s8bAhsg3behIZXjg194gPeQ0VjKZUDaV4tduB2IemngKfJh7ba8L0bTpzW6iQwue6q6U6WGb4jZ2jLG19U7FaiC8XZ394Nl+MA3yWQIDBjIvAHQxovthwr6kjXkRB890iqrQMN+N8E1VTzjTpdoPp3cFRP8c3pqbZ/VEAqqqjiURxx7MRD5cXDu+aGP1oGr9oqJyS3ubRwKmeljKrDm9OHvz4GXvLyhilXsnrE71RLuw+qwzQbByYAFaU+BNJ+CRpYyddKuw/ow12c8AT6okxqB7MMbWyA18qxBt5n2kxkDP3fcMgkkfXR7zQq90Qsgd0c0uVk1E4++umQ3ClCV2vXIon/7GhHJ3b8A3xOFCBpL2cZ+m2z20LzP9/QEf0a5EtfEgsbWeXS5kK/JiJK7w9pZYd/LTg539ofRx4NyOqSMXl4axp94Wm7nme7/rPG18vLF9s9RGMoM/qhi+S/svx6WYztZOcGiEPpYcCfoO2A2jZAkkYabtCH3gG1bYDm33+LQxRHiuMw7emU/oD0gOQQzeXx3WSEIW+3Qc4Pcr92ptmbQqq6qfzV25sMuY7tv2AG7p5Oz2ZlMGI6OzrFzt3t6VH10uHs7PRp2LB9D7hbnfyLUJ5y1EsZGRkZGRkZGRkZGRkZGRkZGRkZGRkZYfwDp0J9lOxUEu4AAAAASUVORK5CYII=",
        tooltip:
          "Your pet lashes out with a vicious bite, dealing a fair amount of damage!"
      }
    ]
  },

  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Pet", PetSchema);
