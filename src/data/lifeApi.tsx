import { ExternalLink } from '../components/ExternalLink';
import { GitHubIcon } from '../components/icons/GitHubIcon';
import { InstagramIcon } from '../components/icons/InstagramIcon';
import { XIcon } from '../components/icons/XIcon';
import { LinkedInIcon } from '../components/icons/LinkedInIcon';
import { ThreadsIcon } from '../components/icons/ThreadsIcon';
import MyWebsite from '../images/logos/mywebsite.png';
import ServerLogo from '../images/logos/server.png';
import RahmaniLogo from '../images/logos/rahmani.svg';
import { manual } from 'prismjs';
export const Name = 'Danel Rahmani';

export const About = (
  <>
    {` This is my personal website, featuring my resume, my thoughts, and projects I've worked on.
    If you want to get in touch`}{' '}
    <ExternalLink href="mailto:danelrahmani@outlook.com">send me an email.</ExternalLink>
  </>
);
export const AboutExtended = `I am a student at the University of Groningen, and have a great many interests.`;

export type Project = {
  title: string;
  techStack: string[];
  description: string;
  logo: any;
  link?: {
    label: string;
    href: string;
  };
};

export const MyCurrentProjects: Project[] = [
  {
    title: 'My personal website',
    techStack: ['NodeJS', 'React', 'TypeScript','Notion','DNS management'],
    description: 'My personal website on the internet.',
    logo: MyWebsite,
    link: {
      label: 'github.com',
      href: 'https://github.com/DanelRahmani/website/',
    },
  },
];

export const MyPastProjects: Project[] = [
  {
    title: 'Personal Minecraft Server',
    techStack: ['Docker', 'Bash', 'Network Administration', 'Linux'],
    description: 'Past Project',
    logo: ServerLogo,
//    link: {
//      label: 'No Longer Available',
//      href: '-',
//    },
  },
];

export const SocialMedia = [
  { name: 'Twitter', link: 'https://twitter.com/DanelRahmani', icon: XIcon },
  { name: 'Instagram', link: 'https://www.instagram.com/danelrahmani/', icon: InstagramIcon },
  { name: 'Threads', link: 'https://www.threads.net/@danelrahmani', icon: ThreadsIcon },
  { name: 'Github', link: 'https://github.com/danelrahmani', icon: GitHubIcon },
  { name: 'LinkedIn', link: 'https://www.linkedin.com/in/danelrahmani', icon: LinkedInIcon },
] as const;

export const Work = [
  {
    company: 'Rahmani\'s Gordijn Kledingatelier',
    title: 'General Employee & Tailor',
    logo: RahmaniLogo,
    start: '2022',
    end: 'Present',
  },
] as const;

export const CompaniesLinks = [
  {
    name: 'Rahmani\'s Gordijn Kledingatelier',
    link: 'https://top-atelier.com/',
  },
] as const;

export const Books = [
    {
    name: 'Les Miserables',
    link: 'https://www.goodreads.com/book/show/24280.Les_Mis_rables/',
  },
    {
    name: '1984',
    link: 'https://www.goodreads.com/book/show/40961427-1984/',
  },
  {
    name: 'The Kite Runner',
    link: 'https://www.goodreads.com/book/show/17165596-the-kite-runner/',
  },
  {
    name: 'The Hunger Games',
    link: 'https://www.goodreads.com/book/show/2767052-the-hunger-games/',
  },
  {
    name: 'The Maze Runner',
    link: 'https://www.goodreads.com/book/show/6186357-the-maze-runner/',
  },
] as const;

export const Music = [
  {
    name: 'Your Lie in April',
    link: 'https://www.imdb.com/title/tt3895150/',
  },
] as const;


export const Series = [
  {
    name: 'Your Lie in April',
    link: 'https://www.imdb.com/title/tt3895150/',
  },
  {
    name: 'Neon Genesis Evangelion',
    link: 'https://www.imdb.com/title/tt0112159/',
  },
  {
    name: 'Steins;Gate',
    link: 'https://www.imdb.com/title/tt1910272/',
  },
  {
    name: 'Koeno Katachi (A Silent Voice)',
    link: 'https://www.imdb.com/title/tt5323662/',
  },
  {
    name: 'Death Note',
    link: 'https://www.imdb.com/title/tt0877057/',
  },
] as const;
