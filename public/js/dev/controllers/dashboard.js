app.controller('DashboardCtrl', function ( $scope ) {
  $scope.pages = [{
title: 'ScupUS',
photo: '/img/avatar.jpg',
posts: [
  {
    time: '10/08/2014',
    type: 'Text',
    text: 'EXCLUSIVE. Learn about the best times to post on the Facebook',
    subjects: ['Exclusive', 'Facebook', 'Content Marketing']
  },
  {
    time: '10/06/2014',
    type: 'Text',
    text: 'EXCLUSIVE. Learn about the best times to post on the Instagram',
    subjects: ['Exclusive', 'Instagram', 'Own Content']   }
]
},


{
title: 'ScupBrasil',
photo: '/img/avatar.jpg',
posts: [
  {
    time: '10/08/2014',
    type: 'Text',
    text: 'EXCLUSIVO. Você sabe quais são os dias e horários mais movimentados das redes sociais? Descubra com o Horários Nobres, estudo realizado pelo Scup, os períodos mais agitados no Facebook, Twitter e Instagram.',
    subjects: ['Exclusivo', 'Twitter', 'Facebook', 'Instagram']
  }
]
},


{
title: 'ScupLATAM',
photo: '/img/avatar.jpg',
posts: [
  {
    time: '01/08/2014',
    type: 'Text',
    text: 'EXCLUSIVO. Saiba como hacer sus post en las redes sociales para tener mayor alcance.',
    subjects: ['Exclusivo', 'Twitter', 'Facebook', 'Instagram']
  },
  {
    time: '02/07/2014',
    type: 'Text',
    text: 'EXCLUSIVO. Facebook y Twitter la batalla por los chicos.',
    subjects: ['Exclusivo', 'Twitter', 'Facebook',] 
  }
]
},
{
title: 'ScupBrasil',
photo: '/img/avatar.jpg',
posts: [
  {
    time: '10/08/2014',
    type: 'Text',
    text: 'EXCLUSIVO. Você sabe quais são os dias e horários mais movimentados das redes sociais? Descubra com o Horários Nobres, estudo realizado pelo Scup, os períodos mais agitados no Facebook, Twitter e Instagram.',
    subjects: ['Exclusivo', 'Twitter', 'Facebook', 'Instagram']
  }
]
}];
console.log($scope.pages);
});