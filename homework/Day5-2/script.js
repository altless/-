const userInput = document.getElementById('username');
const resultDiv = document.getElementById('result');

userInput.addEventListener('input', fetchUserData);

function User(username, real_name, public_repos, public_gists, followers, following, company, blog, location, created_at, latest_repos) {
  this.username = username;
  this.real_name = real_name;
  this.public_repos = public_repos;
  this.public_gists = public_gists;
  this.followers = followers;
  this.following = following;
  this.company = company;
  this.blog = blog;
  this.location = location;
  this.created_at = created_at;
  this.latest_repos = latest_repos;
}

function Repo(name, stars, watchers, forks) {
  this.name = name;
  this.stars = stars;
  this.watchers = watchers;
  this.forks = forks;
}

const users = {
  "h": new User("h", "홍진호", 22, 22, 22, 22, "zerg", "https://www.22ee.com", "'차'행성", "2222-22-22", [
    new Repo("rock-paper-scissors-app", 22, 22, 22),
    new Repo("menu-board-app", 22, 22, 22)
  ]),
  "ho": new User("ho", "이진호", 2, 2, 2, 2, "무직", "https://www.inflearn.com/", "서울", "2020-02-02", [
    new Repo("book-list-app", 2, 2, 2),
    new Repo("rock-paper-scissors-app", 2, 2, 2),
    new Repo("menu-board-app", 2, 2, 2)
  ]),
  "hot": new User("hot", "핫도그", 1, 2, 3, 4, "무직", "https://www.inflearn.com/", "LA", "2020-02-01", [
    new Repo("book-list-app", 15, 7, 3),
    new Repo("github-user-finder-app", 17, 14, 12),
    new Repo("rock-paper-scissors-app", 18, 118, 114)
  ]),
  "hots": new User("hots", "현다원", 2, 15, 81, 51, "무직", "https://www.inflearn.com/", "제주", "2023-05-31", [
    new Repo("rock-paper-scissors-app", 15, 7, 13),
    new Repo("github-user-finder-app", 7, 14, 2),
    new Repo("menu-board-app", 18, 18, 4)
  ]),
  "hotsu": new User("hotsu", "핫식수", 5, 7, 5, 5, "무직", "https://www.hot6su.com/", "세계일주중", "2020-02-01", []),
  "hotsun": new User("hotsun", "김호선", 2, 1, 8, 5, "무직", "https://www.inflearn.com/", "대전", "2020-02-01", [
    new Repo("calculator", 7, 4, 2),
    new Repo("menu-board-app", 18, 800, 4000)
  ]),
  "hotsunn": new User("hotsunn", "김호산", 12, 1, 8, 5, "무직", "https://www.inflearn.com/", "분당", "2020-02-01", [
    new Repo("book-list-app", 35, 7, 3),
    new Repo("calculator", 18, 8, 4)
  ]),
  "hotsunny": new User("hotsunny", "송호선", 22, 31, 5, 24, "무직", "https://www.inflearn.com/", "전주", "2020-01-28", [
    new Repo("book-list-app", 25, 17, 3),
    new Repo("github-user-finder-app", 7, 4, 2),
    new Repo("menu-board-app", 18, 28, 4),
    new Repo("rock-paper-scissors-app", 184, 118, 4),
    new Repo("calculator-app", 18, 8, 4)
  ])
};

function fetchUserData() {
  const username = userInput.value;
  if (username === '') {
    resultDiv.innerHTML = '';
    return;
  }

  const user = users[username];

  if (user) {
    renderUser(user);
  } else {
    resultDiv.innerHTML = '<p>유저를 찾을 수 없습니다.</p>';
  }
}

function renderUser(user) {
  resultDiv.innerHTML = `
    <div class="user">
      <div class="user-info">
        <div calss="user-name">
          <img src="userIcon.png">
          <h2>${user.username}</h2>
          <p>${user.real_name}</p>
        </div>
        <div class="info-detail">
          <div class="info-bar">
            <span>Public Repos: ${user.public_repos}</span>
            <span>Public Gists: ${user.public_gists}</span>
            <span>Followers: ${user.followers}</span>
            <span>Following: ${user.following}</span>
          </div>
          <div class="info">
            <p><strong>Company:</strong> ${user.company || '없음'}</p>
            <p><strong>Website:</strong> ${user.blog ? `<a href="${user.blog}" target="_blank">${user.blog}</a>` : '없음'}</p>
            <p><strong>Location:</strong> ${user.location || '없음'}</p>
            <p><strong>Member Since:</strong> ${new Date(user.created_at).toLocaleDateString()}</p>
          </div>
        </div>
      </div>
      <div class="latest-repos">  
        <strong>Latest Repos:</strong>
          ${user.latest_repos.map(repo => `
            <div class="repo">
              <strong>${repo.name}</strong> ⭐ ${repo.stars} | 👁️ ${repo.watchers} | 🍴 ${repo.forks}
            </div>
          `).join('')}
      </div>
    </div>
    `;
}