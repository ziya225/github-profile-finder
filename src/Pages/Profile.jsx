import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { BsGithub, BsLinkedin } from 'react-icons/bs';
import { GoLocation } from 'react-icons/go';
import axios from 'axios';
import Loader from '../Components/Loader';
import RepoCard from '../Components/RepoCard';

const Profile = () => {
  let { username } = useParams();

  const [data, setData] = useState([]);
  const [repos, setRepos] = useState([]);

  useEffect(() => {
    const apiCall = setTimeout(() => {
      axios
        .get(`https://api.github.com/users/${username}`)
        .then((res) => setData(res.data));
      axios
        .get(`https://api.github.com/users/${username}/repos`)
        .then((res) => setRepos(res.data));
    }, 1500);
    return () => clearTimeout(apiCall);
  }, []);

  return (
    <>
      <div className="flex flex-col items-center h-auto px-5 mb-5">
        <h1 className="my-5 text-4xl font-bold text-center">
          {username} GitHub Profile
        </h1>
        {data.length !== 0 ? (
          <>
            <div className="flex w-full py-5 border-white card lg:card-side card-bordered md:px-5 md:w-5/12">
              <div className="flex items-center justify-center avatar">
                <div className="w-40 h-40 mb-8 rounded-full ">
                  <img alt="avatar" src={data.avatar_url} />
                </div>
              </div>

              <div className="flex items-center p-0 card-body sm:p-5">
                <h1 className="text-3xl card-title">
                  {data.name ? data.name : username}
                </h1>
                <div className="flex flex-wrap w-full my-1 badges justify-evenly">
                  <div className="cursor-pointer badge badge-primary ">
                    <a href={`https://github.com/${username}?tab=repositories`}>
                      <b>Repos: {data.public_repos}</b>
                    </a>
                  </div>
                  <div className="cursor-pointer badge badge-secondary ">
                    <a href={`https://github.com/${username}?tab=followers`}>
                      <b>Followers {data.followers}</b>
                    </a>
                  </div>
                  <div className="cursor-pointer badge badge-accent">
                    <a href={`https://github.com/${username}?tab=following`}>
                      <b>Following {data.following}</b>
                    </a>
                  </div>
                </div>
                <div className="flex items-center mt-3 location">
                  {data.location && <GoLocation />}

                  <p className="ml-2 text-xl">{data.location}</p>
                </div>
                <div className="flex items-center blog ">
                  {data.blog && <BsLinkedin />}
                  <a className="ml-2" href={`${data.blog}`}>
                    {data.blog}
                  </a>
                </div>
                <div className="card-actions">
                  <a href={`${data.html_url}`} className="btn btn-outline ">
                    <BsGithub className="mr-2 text-lg" />
                    View Profile
                  </a>
                </div>
              </div>
            </div>

            <div className="mt-10 w-12/12 h-2/5 ">
              <h1 className="text-3xl font-bold text-center ">Repositories</h1>
              <p className="text-2xl font-bold text-center">
                ({data.public_repos})
              </p>
              <div className="mt-10 border-l-2">
                {repos.map((repo, i) => (
                  <RepoCard
                    key={repo.id}
                    liveDemo={repo.homepage}
                    name={repo.name}
                    description={repo.description}
                    topics={repo.topics}
                    htmlUrl={repo.html_url}
                    language={repo.language}
                  />
                ))}
              </div>
              {data.public_repos > 30 && (
                <a href={`${data.html_url}`} className="w-full btn btn-outline">
                  View all repos
                </a>
              )}
            </div>
          </>
        ) : (
          <Loader />
        )}
      </div>
    </>
  );
};

export default Profile;
