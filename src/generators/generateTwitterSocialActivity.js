import _ from 'lodash';

export default function twitterTransformer(message) {
  const PostMedia = [];
  if (message.actor && message.actor.id) {
    PostMedia.push({
      MediaType: _.get(message, 'type') || 'image',
      URL: message.actor.link,
    });
  }
  const socialActivity = {
    ActivityURL: _.get(message, 'link'),
    AuthorID: _.get(message, 'actor.id'),
    AuthorPictureURL: _.get(message, 'actor.image'),
    AuthorRealName: _.get(message, 'actor.displayName'),
    AuthorUsername: _.get(message, 'actor.preferredUsername'),
    BodyText: _.get(message, 'body'),
    ID: message.id,
    Network: 'twitter',
    PostMedia: PostMedia,
    Version: '2.0',
  };
  if (socialActivity.ID && socialActivity.BodyText) {
    return socialActivity;
  }
  return undefined;
}
