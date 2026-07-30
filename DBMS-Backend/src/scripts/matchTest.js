const base = 'http://localhost:7000';

function rand(prefix){ return prefix + Math.random().toString(36).slice(2,10) + '@example.com'; }

(async ()=>{
  try{
    const donorEmail = rand('rahim');
    const reqEmail = rand('req');

    const donorBody = {
      name: 'Rahim',
      email: donorEmail,
      password: 'pass1234',
      phone: '017' + Math.floor(Math.random()*90000000+10000000),
      bloodGroup: 'O_POSITIVE',
      role: 'DONOR',
      latitude:22.35, longitude:91.78
    };

    const reqBody = {
      name: 'Requester',
      email: reqEmail,
      password: 'pass1234',
      phone: '017' + Math.floor(Math.random()*90000000+10000000),
      bloodGroup: 'A_POSITIVE',
      role: 'RECEIVER'
    };

    console.log('Register donor', donorEmail);
    let r = await fetch(base + '/api/auth/register', {method:'POST', headers:{'content-type':'application/json'}, body:JSON.stringify(donorBody)});
    let donRes = await r.json();
    console.log('donor response', donRes);

    console.log('Register requester', reqEmail);
    r = await fetch(base + '/api/auth/register', {method:'POST', headers:{'content-type':'application/json'}, body:JSON.stringify(reqBody)});
    let reqRes = await r.json();
    console.log('requester response', reqRes);
    const token = reqRes.accessToken;

    console.log('Create emergency');
    const emBody = {bloodGroup:'O_POSITIVE', latitude:22.3569, longitude:91.7832, urgency:'HIGH'};
    r = await fetch(base + '/api/emergency', {method:'POST', headers:{'content-type':'application/json','authorization':'Bearer '+token}, body:JSON.stringify(emBody)});
    const emRes = await r.json();
    console.log('emergency create', emRes);
    const requestId = emRes.request.id;

    console.log('Get matches for', requestId);
    r = await fetch(base + `/api/emergency/${requestId}/matches`, {method:'GET', headers:{'authorization':'Bearer '+token}});
    const matches = await r.json();
    console.log('matches', matches);

  }catch(e){
    console.error('error', e);
  }
})();
