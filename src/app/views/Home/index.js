import React from 'react';
import Helmet from 'react-helmet';

import config from 'app/config';
import SpecialLayout from 'app/layouts/Special';

import styles from './styles.styl';


const HomeView = () => (
  <SpecialLayout className={styles.root}>
    <Helmet title={`Home | ${config.siteName}`} />
    <h1>Home</h1>
    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam tristique velit quis lorem volutpat porta. Vivamus lacinia vel eros ut sagittis. Pellentesque pulvinar feugiat consectetur. Duis velit nibh, molestie eu tincidunt at, gravida luctus quam. In hac habitasse platea dictumst. Maecenas viverra et dui non efficitur. Nulla at orci lectus. Fusce eu ante viverra, pulvinar sapien eget, interdum turpis. Donec volutpat sagittis tincidunt. In hac habitasse platea dictumst. Donec malesuada sagittis risus in semper.</p>
    <p>Curabitur iaculis neque sed mollis tempor. Pellentesque ut sem varius, feugiat mi vitae, ultricies magna. Curabitur id odio eget lectus scelerisque condimentum id ac est. In euismod magna nec leo ullamcorper viverra. Interdum et malesuada fames ac ante ipsum primis in faucibus. Ut sit amet diam turpis. Sed finibus nisl sed efficitur tincidunt. Nullam placerat purus eu ornare molestie. Sed nec dignissim mauris, non varius turpis. Phasellus auctor et mi non laoreet.</p>
    <p>Duis suscipit efficitur arcu, ac ullamcorper sapien. Sed auctor commodo dui a egestas. Suspendisse non libero maximus, efficitur odio vitae, semper urna. Aenean eu tortor id nulla consequat ornare. Quisque lorem lectus, fringilla eget fermentum et, tristique quis odio. Quisque a cursus tellus. Mauris nec fringilla quam. Pellentesque tincidunt ut sem porttitor ultricies. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut dapibus scelerisque neque quis luctus.</p>
    <p>Sed eu arcu eu ex imperdiet auctor. Curabitur et aliquam neque, nec cursus turpis. Suspendisse potenti. Donec nec vulputate justo. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Quisque ut justo accumsan, consectetur mi porttitor, dictum leo. Mauris vulputate vestibulum nibh. Integer sit amet felis sed mi iaculis vehicula. Aenean neque risus, pretium quis dolor in, pulvinar sollicitudin eros. Quisque cursus ultricies justo, quis tincidunt felis. Nunc lobortis ipsum egestas auctor pulvinar.</p>
    <p>Aliquam tempus euismod purus vitae laoreet. Ut sit amet semper mi, ut posuere risus. Interdum et malesuada fames ac ante ipsum primis in faucibus. Vestibulum euismod leo vel ligula viverra rutrum. Nulla tincidunt eros urna, in egestas mauris aliquam in. Donec consectetur hendrerit mi, eu mattis eros pharetra id. Praesent molestie eget risus vel ornare. Vivamus vestibulum vel libero in hendrerit. Praesent pharetra purus sed convallis ultrices. Vestibulum condimentum, lectus et interdum ultricies, ex est congue odio, nec viverra elit ante sit amet leo. Maecenas vitae lectus a justo pretium ullamcorper. Phasellus nec libero lacinia, feugiat velit nec, rhoncus risus. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae;</p>
  </SpecialLayout>
);

export default HomeView;
